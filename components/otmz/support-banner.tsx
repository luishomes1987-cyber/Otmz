'use client'

import { SiFortnite } from 'react-icons/si'
import { SUPPORT_CODE } from '@/lib/otmz-data'

function BannerContent() {
  // Repeated a few times so the loop is seamless across wide screens.
  const items = Array.from({ length: 6 })
  return (
    <div className="flex shrink-0 items-center">
      {items.map((_, i) => (
        <span
          key={i}
          className="flex items-center gap-2.5 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-foreground/90"
        >
          <SiFortnite className="h-3.5 w-3.5" />
          Creator Code
          <span className="rounded-md bg-brand-foreground/15 px-2 py-0.5 font-bold text-brand-foreground">
            {SUPPORT_CODE}
          </span>
        </span>
      ))}
    </div>
  )
}

export function SupportBanner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[55] overflow-hidden border-b border-brand/30 bg-brand py-2">
      <div className="flex w-max animate-marquee">
        <BannerContent />
        <BannerContent aria-hidden />
      </div>
    </div>
  )
}
