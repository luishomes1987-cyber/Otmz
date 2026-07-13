'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { FaXTwitter, FaTiktok } from 'react-icons/fa6'
import {
  divisions,
  DISCORD_URL,
  getDivisionImage,
  socials,
  type DivisionId,
} from '@/lib/otmz-data'
import { cn } from '@/lib/utils'

const SOCIAL_ICONS = {
  x: FaXTwitter,
  tiktok: FaTiktok,
} as const

export function Navbar({
  active,
  onChange,
}: {
  active: DivisionId
  onChange: (id: DivisionId) => void
}) {
  return (
    <header className="fixed inset-x-0 top-9 z-50 flex justify-center px-4 pt-3">
      <nav className="flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 px-3 py-2.5 backdrop-blur-xl md:px-4">
{/* Logo */}
<button
  onClick={() => onChange('otmz')}
  className="flex items-center gap-2 pl-1"
  aria-label="OTMZ início"
>
  <motion.img
    key={active}
    src={getDivisionImage(active)}
    alt={`Logo ${divisions.find((d) => d.id === active)?.label ?? 'OTMZ'}`}
    className="h-10 w-10 object-contain"
    initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  />

  <span className="hidden font-display text-lg font-bold tracking-wide sm:block">
    OTMZ
  </span>
</button>

        {/* Division switcher */}
        <div className="relative flex items-center gap-0.5 rounded-xl bg-secondary/60 p-1">
          {divisions.map((d) => {
            const isActive = active === d.id
            return (
              <button
                key={d.id}
                onClick={() => onChange(d.id)}
                data-division={d.id}
                className={cn(
                  'relative rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors md:px-4 md:text-sm',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-brand/15 ring-1 ring-brand/40"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: isActive
                        ? 'var(--brand)'
                        : 'color-mix(in oklab, var(--muted-foreground) 50%, transparent)',
                    }}
                  />
                  <span className="whitespace-nowrap">
                    <span className="md:hidden">{d.short}</span>
                    <span className="hidden md:inline">{d.label}</span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Socials + Discord CTA */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.id]
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-all hover:border-brand/50 hover:text-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground transition-all hover:brand-glow hover:brightness-110 md:px-4"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Entrar no Discord</span>
            <span className="sm:hidden">Discord</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
