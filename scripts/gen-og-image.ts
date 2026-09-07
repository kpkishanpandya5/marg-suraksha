/**
 * Renders the Open Graph / Twitter card image to public/og-image.png at build time
 * (wired into `prebuild`). A real .png in public/ is served correctly by any static
 * host, unlike the app-router opengraph-image route under `output: export`.
 *
 * Fully offline: the fonts are vendored in assets/ and next/og does the rest, so a
 * build with no network still produces a valid image.
 */
import { ImageResponse } from 'next/og'
import fs from 'node:fs'
import path from 'node:path'

const SITE_NAME = 'Marg Suraksha'
const BG = '#FAFAFA'
const FG = '#1A1A1A'
const ACCENT = '#1D4ED8'
const MUTED = '#6B7280'

const HEADLINE = SITE_NAME
const SUBHEAD = 'Help after a road accident in India'
const TAGS =
  'First 72 hours  ·  Documents  ·  Cashless treatment  ·  Compensation  ·  Insurance'

const OUT = path.join(process.cwd(), 'public/og-image.png')
const FONT_DIR = path.join(process.cwd(), 'assets')

const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: children === undefined ? { style } : { style, children },
})

async function main() {
  try {
    const fonts = [
      { name: 'Noto Sans', weight: 400 as const, style: 'normal' as const, data: fs.readFileSync(path.join(FONT_DIR, 'NotoSans-Regular.ttf')) },
      { name: 'Noto Sans', weight: 700 as const, style: 'normal' as const, data: fs.readFileSync(path.join(FONT_DIR, 'NotoSans-Bold.ttf')) },
    ]

    const tree = el(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        color: FG,
        padding: 80,
        fontFamily: 'Noto Sans, sans-serif',
      },
      [
        el('div', { display: 'flex', width: 96, height: 10, background: ACCENT }),
        el('div', { display: 'flex', flexDirection: 'column' }, [
          el('div', { fontSize: 96, fontWeight: 700, letterSpacing: '-0.02em' }, HEADLINE),
          el('div', { fontSize: 44, fontWeight: 400, marginTop: 16 }, SUBHEAD),
        ]),
        el('div', { display: 'flex', fontSize: 26, color: MUTED }, TAGS),
      ]
    )

    const res = new ImageResponse(tree as never, { width: 1200, height: 630, fonts })
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
      throw new Error('render did not produce a PNG')
    }
    fs.writeFileSync(OUT, buf)
    console.log(`og-image: wrote ${OUT} (${buf.length} bytes)`)
  } catch (err) {
    if (fs.existsSync(OUT)) {
      console.warn('og-image: render failed, keeping existing public/og-image.png:', err)
    } else {
      console.error('og-image: render failed and no existing image to fall back to:', err)
      process.exit(1)
    }
  }
}

main()
