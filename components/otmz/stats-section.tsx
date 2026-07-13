'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Crown,
  Gauge,
  Headphones,
  Server,
  Trophy,
  Users2,
  Zap,
} from 'lucide-react'
import {
  esportsPlayers,
  esportsSecondary,
  fpsBoost,
  otmzStats,
  zonewarsHighlights,
  type DivisionId,
} from '@/lib/otmz-data'
import { CountUp } from './count-up'
import { Reveal, SectionHeading } from './ui'

/* ───────────────────────── OTMZ ───────────────────────── */

const FPS_BARS = [26, 38, 47, 58, 66, 78, 88, 100]

function FpsBoostCard() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-brand/40 bg-brand/[0.06] p-7 brand-glow sm:p-9">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Antes */}
          <div className="shrink-0 text-center md:text-left">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Antes
            </span>
            <div className="font-display text-3xl font-bold text-muted-foreground line-through decoration-brand/40 sm:text-4xl">
              <CountUp value={fpsBoost.from} suffix=" FPS" />
            </div>
          </div>

          {/* Escala de subida */}
          <div className="relative flex h-28 flex-1 items-end justify-center gap-1.5 px-2 sm:gap-2">
            {FPS_BARS.map((h, i) => (
              <motion.div
                key={i}
                className="w-3 rounded-t bg-gradient-to-t from-brand/40 to-brand sm:w-4"
                initial={{ height: 6, opacity: 0.4 }}
                whileInView={{ height: `${h}%`, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
            <motion.div
              className="absolute -right-1 top-0 text-brand"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <ArrowUpRight className="h-6 w-6" />
            </motion.div>
          </div>

          {/* Depois */}
          <div className="shrink-0 text-center md:text-right">
            <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-brand-muted">
              <Zap className="h-3 w-3" /> Depois
            </span>
            <div className="font-display text-5xl font-bold text-glow sm:text-6xl">
              <CountUp value={fpsBoost.to} suffix=" FPS" />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function OtmzStats() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="Números"
        title="Resultados que se sentem"
        subtitle="Mais FPS, menos lag e clientes que voltam. Os números falam por si."
      />

      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {otmzStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-sm transition-colors hover:border-brand/40">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="font-display text-4xl font-bold text-glow sm:text-5xl"
              />
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4">
        <FpsBoostCard />
      </div>
    </section>
  )
}

/* ─────────────────────── ZoneWars ─────────────────────── */

const ZW_ICONS = {
  trophy: Trophy,
  server: Server,
  crown: Crown,
  users: Users2,
} as const

function ZoneWarsHighlights() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="Porquê OTMZ Customs"
        title="A casa do competitivo português"
        subtitle="As melhores scrims pagas de Portugal, o maior servidor e a maior comunidade — com quase todos os prós PT."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {zonewarsHighlights.map((h, i) => {
          const Icon = ZW_ICONS[h.icon]
          return (
            <Reveal key={h.title} delay={(i % 2) * 0.08}>
              <div className="group flex h-full items-start gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/30 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {h.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {h.text}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ─────────────────────── Esports ─────────────────────── */

function EsportsStats() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="A organização"
        title="Movidos pelos jogadores"
        subtitle="No centro da OTMZ Esports estão as pessoas que competem com as nossas cores."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Hero — Jogadores */}
        <Reveal className="md:col-span-3">
          <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-brand/40 bg-brand/[0.06] p-10 text-center brand-glow">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <Gauge className="mx-auto h-8 w-8 text-brand" />
              <CountUp
                value={esportsPlayers.value}
                suffix={esportsPlayers.suffix}
                className="mt-3 block font-display text-6xl font-bold text-glow sm:text-7xl"
              />
              <p className="mt-2 text-sm uppercase tracking-widest text-brand-muted">
                {esportsPlayers.label}
              </p>
            </div>
          </div>
        </Reveal>

        {esportsSecondary.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-sm transition-colors hover:border-brand/40">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="font-display text-4xl font-bold text-glow sm:text-5xl"
              />
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={esportsSecondary.length * 0.08}>
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-sm transition-colors hover:border-brand/40">
            <Headphones className="h-6 w-6 text-brand" />
            <div className="mt-2 font-display text-4xl font-bold text-glow sm:text-5xl">
              24/7
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Comunidade ativa</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function StatsSection({ division }: { division: DivisionId }) {
  if (division === 'zonewars') return <ZoneWarsHighlights />
  if (division === 'esports') return <EsportsStats />
  return <OtmzStats />
}
