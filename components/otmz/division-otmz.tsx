'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { DISCORD_URL, packs, services, type Service } from '@/lib/otmz-data'
import { ParticleField } from './backgrounds'
import { PerfCounters } from './perf-counters'
import { ServiceIcon } from './service-icon'
import { BrandButton, Reveal, SectionHeading } from './ui'

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pt-28">
      <ParticleField density={70} />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Powered by rodry.81zn
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display text-6xl font-bold tracking-tight text-glow sm:text-7xl md:text-8xl"
        >
          OTMZ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Otimizações profissionais para extrair o máximo desempenho do teu
          computador.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <BrandButton href="#servicos">
            Ver Serviços <ArrowRight className="h-4 w-4" />
          </BrandButton>
          <BrandButton href={DISCORD_URL} variant="outline">
            <MessageCircle className="h-4 w-4" /> Entrar no Discord
          </BrandButton>
        </motion.div>
      </div>
    </section>
  )
}

export function DivisionOtmz() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <div>
      <Hero />

      <PerfCounters />

      {/* Services */}
      <section id="servicos" className="relative mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Serviços"
          title="Otimizações premium ao detalhe"
          subtitle="Cada serviço é aplicado e personalizado ao teu hardware. Clica num cartão para ver os detalhes completos."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setSelected(s)}
                className="group relative flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/30 transition-transform duration-300 group-hover:scale-110">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </div>
                <div className="relative">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
                </div>
                <span className="relative mt-auto inline-flex items-center gap-1 pt-2 text-xs font-medium text-brand-muted opacity-0 transition-opacity group-hover:opacity-100">
                  Ver detalhes <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="relative mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Serviços"
          title="Escolhe o teu pack"
          subtitle="Pacotes completos que combinam vários serviços num processo único e guiado."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {packs.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm transition-all duration-300 ${
                  p.highlight
                    ? 'border-brand/60 bg-brand/[0.06] brand-glow'
                    : 'border-border bg-card/60 hover:border-brand/40'
                }`}
              >
                {p.badge && (
                  <span
                    className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-semibold ${
                      p.highlight
                        ? 'bg-brand text-brand-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {p.badge}
                  </span>
                )}
                <span className="text-xs font-medium uppercase tracking-widest text-brand-muted">
                  {p.tier}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-bold">
                  {p.name}
                </h3>
                <div className="mt-3 flex items-end gap-1.5">
                  <span className="font-display text-4xl font-bold text-glow">
                    {p.price}
                  </span>
                  {p.priceNote && (
                    <span className="mb-1 text-sm text-muted-foreground">
                      {p.priceNote}
                    </span>
                  )}
                </div>
                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <BrandButton
                  href={DISCORD_URL}
                  variant={p.highlight ? 'solid' : 'outline'}
                  className="mt-7 w-full"
                >
                  Encomendar
                </BrandButton>
                {p.note && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    {p.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Service modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand/40 bg-card p-7 brand-glow"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/30">
                <ServiceIcon name={selected.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">
                {selected.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-brand-muted">
                {selected.short}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {selected.description}
              </p>
              <BrandButton href={DISCORD_URL} className="mt-6 w-full">
                <MessageCircle className="h-4 w-4" /> Pedir este serviço
              </BrandButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
