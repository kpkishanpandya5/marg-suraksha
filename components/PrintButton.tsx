'use client'

export default function PrintButton({ label = 'Print' }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="text-[#1D4ED8] underline bg-transparent border-0 p-0 text-sm cursor-pointer"
      type="button"
    >
      {label}
    </button>
  )
}
