'use client'

import type { Lang } from '@/lib/i18n'

// The current language lives on <html data-lang> (set before paint by the inline
// script in layout.tsx). This toggle just writes that attribute and persists the
// choice; the active-button styling is driven from the attribute in CSS, so no
// React state and no hydration dance.
function setLang(lang: Lang) {
  const root = document.documentElement
  root.setAttribute('data-lang', lang)
  root.setAttribute('lang', lang === 'hi' ? 'hi' : 'en')
  try {
    localStorage.setItem('lang', lang)
  } catch {
    // storage blocked; the choice just won't persist across pages
  }
}

export default function LangToggle() {
  return (
    <div className="lang-toggle flex items-center gap-1 text-sm shrink-0" aria-label="Language / भाषा">
      <button
        type="button"
        onClick={() => setLang('en')}
        className="lt-btn lt-en px-2 py-0.5 border border-[#E5E7EB] bg-transparent text-[#1A1A1A]"
        aria-label="View this site in English"
      >
        EN
      </button>
      <button
        type="button"
        lang="hi"
        onClick={() => setLang('hi')}
        className="lt-btn lt-hi px-2 py-0.5 border border-[#E5E7EB] bg-transparent text-[#1A1A1A]"
        aria-label="इस साइट को हिन्दी में देखें"
      >
        हिन्दी
      </button>
    </div>
  )
}
