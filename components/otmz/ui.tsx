'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <Reveal className={cn('mx-auto max-w-2xl text-center', className)}>
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

export function BrandButton({
  children,
  href,
  variant = 'solid',
  onClick,
  className,
}: {
  children: ReactNode
  href?: string
  variant?: 'solid' | 'outline' | 'ghost'
  onClick?: () => void
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300'
  const styles = {
    solid: 'bg-brand text-brand-foreground hover:brand-glow hover:brightness-110',
    outline:
      'border border-brand/50 text-foreground hover:bg-brand/10 hover:border-brand',
    ghost: 'text-muted-foreground hover:text-foreground hover:bg-secondary',
  }[variant]

  const cls = cn(base, styles, className)

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className={cls}
      >
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
