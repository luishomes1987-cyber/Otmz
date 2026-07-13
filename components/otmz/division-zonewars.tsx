'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Bot,
  Coins,
  Flame,
  Gamepad2,
  Gift,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { useState } from 'react'
import {
  activitySteps,
  activityWarning,
  customsPrize,
  DISCORD_URL,
  generalRules,
  tokenSteps,
} from '@/lib/otmz-data'
import { ParticleField } from './backgrounds'
import { CountUp } from './count-up'
import { BrandButton, Reveal, SectionHeading } from './ui'

type RulesTabId = 'gerais' | 'tokens'

const RULES_TABS: { id: RulesTabId; label: string; icon: typeof BookOpen }[] = [
  { id: 'gerais', label: 'Regras Gerais', icon: BookOpen },
  { id: 'tokens', label: 'Tokens', icon: Coins },
]

function GeneralRules() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {generalRules.map((rule, i) => (
        <Reveal key={rule} delay={(i % 2) * 0.06}>
          <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-brand/40">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-xs font-bold text-brand ring-1 ring-brand/30">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {rule}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Tokens() {
  return (
    <div>
      <Reveal className="flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm">
          <Bot className="h-4 w-4 text-brand" /> Tudo gerido automaticamente pelo{' '}
          <span className="font-semibold text-foreground">Yunite Bot</span>
        </span>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tokenSteps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08}>
            <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow">
              <span className="font-display text-5xl font-bold text-brand/25">
                {s.step}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Visual flow */}
      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm">
          {['Joga', 'Ganha', 'Reclama o teu prémio'].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-brand/10 px-4 py-2 text-sm font-semibold text-brand ring-1 ring-brand/30">
                {i === 2 && <Sparkles className="h-3.5 w-3.5" />}
                {label}
              </span>
              {i < 2 && <ArrowRight className="h-4 w-4 text-brand-muted" />}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

function RulesSection() {
  const [tab, setTab] = useState<RulesTabId>('gerais')

  return (
    <section id="regras" className="relative mx-auto max-w-5xl px-4 py-24">
      <SectionHeading
        eyebrow="Comunidade OTMZ"
        title="Regras"
        subtitle="Tudo o que precisas de saber para jogar com fair play e ganhar prémios na OTMZ Customs."
      />

      {/* Tabs */}
      <div className="mt-10 flex justify-center">
        <div className="flex items-center gap-1 rounded-2xl border border-border bg-secondary/60 p-1 backdrop-blur-sm">
          {RULES_TABS.map((t) => {
            const Icon = t.icon
            const isActive = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors md:px-6 ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="customs-rules-tab"
                    className="absolute inset-0 rounded-xl bg-brand/15 ring-1 ring-brand/40"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {t.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Panel */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === 'gerais' ? <GeneralRules /> : <Tokens />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

const ACTIVITY_ICONS = [Gamepad2, Trophy, Gift] as const

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pt-28">
      <ParticleField density={55} />
      <motion.div
        className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand/25 blur-[120px]"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-brand/20 blur-[120px]"
        animate={{ opacity: [0.9, 0.5, 0.9] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-muted"
        >
          <Flame className="h-3.5 w-3.5" /> Powered by rodry.81zn
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-bold uppercase tracking-tight text-glow sm:text-7xl md:text-8xl"
        >
          Customs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Scrims, ZoneWars, Customs e torneios premiados para jogadores
          competitivos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <BrandButton href="#participar">
            Participar <ArrowRight className="h-4 w-4" />
          </BrandButton>
          <BrandButton href={DISCORD_URL} variant="ghost">
            <MessageCircle className="h-4 w-4" /> Discord
          </BrandButton>
        </motion.div>
      </div>
    </section>
  )
}

export function DivisionZoneWars() {
  return (
    <div>
      <Hero />

      {/* Prize pool highlight */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-brand/[0.06] p-10 text-center brand-glow md:p-14">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-muted">
                <Coins className="h-3.5 w-3.5" /> Prémios reais
              </span>
              <div className="mt-5 flex items-center justify-center font-display text-6xl font-bold text-glow sm:text-7xl md:text-8xl">
                <span>+</span>
                <CountUp value={customsPrize.value} />
                <span>€</span>
              </div>
              <p className="mx-auto mt-3 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                Mais de 1000€ já {customsPrize.label} nas nossas customs e
                torneios.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Activity system — Yunite */}
      <section id="participar" className="relative mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Sistema de atividade"
          title="Joga, ganha e reclama o teu prémio"
          subtitle="Sem códigos, sem complicações. Todo o sistema é gerido automaticamente pelo Yunite Bot no nosso Discord."
        />

        <Reveal className="mt-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <Bot className="h-4 w-4 text-brand" /> Gerido automaticamente pelo{' '}
            <span className="font-semibold text-foreground">Yunite Bot</span>
          </span>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {activitySteps.map((s, i) => {
            const Icon = ACTIVITY_ICONS[i]
            return (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-4xl font-bold text-brand/25">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Visual flow */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm">
            {['Joga', 'Ganha', 'Reclama o teu prémio'].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <span className="rounded-lg bg-brand/10 px-4 py-2 text-sm font-semibold text-brand ring-1 ring-brand/30">
                  {label}
                </span>
                {i < 2 && <ArrowRight className="h-4 w-4 text-brand-muted" />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Eligibility warning */}
        <Reveal className="mt-6">
          <div className="flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {activityWarning}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <BrandButton href={DISCORD_URL}>
            <Trophy className="h-4 w-4" /> Entrar na competição
          </BrandButton>
        </Reveal>
      </section>

      {/* Regras */}
      <RulesSection />
    </div>
  )
}
