'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Gamepad2,
  Mail,
  MessageCircle,
  Rocket,
  Shirt,
  Sparkles,
  Trophy,
  Users2,
  Video,
} from 'lucide-react'
import Image from 'next/image'
import {
  creatorRequirements,
  DISCORD_URL,
  kits,
  OTMZ_EMAIL,
  teamRequirements,
} from '@/lib/otmz-data'
import { ParticleField } from './backgrounds'
import { Roster } from './roster'
import { BrandButton, Reveal, SectionHeading } from './ui'

const GAME_ICONS = {
  fortnite: Gamepad2,
  rocket: Rocket,
} as const

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pt-28">
      <ParticleField density={60} />
      <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-muted"
        >
          <Sparkles className="h-3.5 w-3.5" /> Powered by rodry.81zn
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-bold tracking-tight text-glow sm:text-7xl md:text-8xl"
        >
          OTMZ Esports
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Uma organização portuguesa dedicada ao desenvolvimento de jogadores
          competitivos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <BrandButton href="#recrutamento">
            Entrar na equipa <ArrowRight className="h-4 w-4" />
          </BrandButton>
          <BrandButton href="#elenco" variant="outline">
            <Users2 className="h-4 w-4" /> Elenco
          </BrandButton>
          <BrandButton href="#kits" variant="outline">
            <Shirt className="h-4 w-4" /> Ver Kits
          </BrandButton>
          <BrandButton href={DISCORD_URL} variant="ghost">
            <MessageCircle className="h-4 w-4" /> Discord
          </BrandButton>
        </motion.div>
      </div>
    </section>
  )
}

function Recruitment() {
  return (
    <section id="recrutamento" className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="Recrutamento"
        title="Entra na OTMZ Esports"
        subtitle="Cumpre os requisitos da tua modalidade e mostra o teu valor para representar as nossas cores."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {teamRequirements.map((t, i) => {
          const Icon = GAME_ICONS[t.icon]
          return (
            <Reveal key={t.game} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/30 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{t.game}</h3>
                </div>
                <span className="mt-6 text-xs font-medium uppercase tracking-widest text-brand-muted">
                  Requisitos
                </span>
                <ul className="mt-3 flex flex-col gap-3">
                  {t.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span className="text-muted-foreground">{r}</span>
                    </li>
                  ))}
                </ul>
                <BrandButton
                  href={DISCORD_URL}
                  variant="outline"
                  className="mt-7 w-full"
                >
                  <Trophy className="h-4 w-4" /> Candidatar-me
                </BrandButton>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function ContentCreators() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-brand/[0.06] p-8 brand-glow md:p-12">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-muted">
                <Video className="h-3.5 w-3.5" /> Content Creators
              </span>
              <h3 className="mt-4 text-balance font-display text-3xl font-bold sm:text-4xl">
                Cria conteúdo com a OTMZ ESPORTS
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Queres entrar como Content Creator? Envia a tua candidatura por
                email. Aplica-se a Fortnite e Rocket League.
              </p>
              <a
                href={`mailto:${OTMZ_EMAIL}`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-all hover:brand-glow hover:brightness-110"
              >
                <Mail className="h-4 w-4" /> {OTMZ_EMAIL}
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-background/40 p-6">
              <span className="text-xs font-medium uppercase tracking-widest text-brand-muted">
                O email deve conter
              </span>
              <ul className="mt-4 flex flex-col gap-3">
                {creatorRequirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span className="text-muted-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
export function DivisionEsports() {
  return (
    <div>
      <Hero />

      <Roster />

      <Recruitment />

      <ContentCreators />

      {/* Kits */}
      <section id="kits" className="relative mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Merch"
          title="Kits Oficiais OTMZ"
          subtitle="Veste as cores da organização. Novas edições em breve."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {kits.map((k, i) => (
            <Reveal key={k.name} delay={i * 0.08}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow">
                <div className="relative aspect-square overflow-hidden bg-background/40">
                  <Image
                    src={k.image || '/placeholder.svg'}
                    alt={`${k.name} — jersey OTMZ Esports`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                      k.outOfStock ? 'grayscale-[0.35]' : ''
                    }`}
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">
                    <Shirt className="h-3 w-3" /> {k.subtitle}
                  </span>

                  {k.outOfStock && (
                    <>
                      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-foreground/20 bg-foreground/10 px-6 py-3 backdrop-blur-md"
                      >
                        <span className="animate-pulse font-display text-lg font-bold uppercase tracking-[0.25em] text-foreground">
                          Out of Stock
                        </span>
                      </motion.span>
                    </>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-bold">{k.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {k.description}
                  </p>
                  <BrandButton
                    href={DISCORD_URL}
                    variant={k.outOfStock ? 'outline' : 'solid'}
                    className="mt-6 w-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {k.outOfStock ? 'Notificar-me' : 'Encomendar'}
                  </BrandButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="relative mx-auto max-w-5xl px-4 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-brand/[0.06] p-10 text-center brand-glow md:p-14">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative">
              <Users2 className="mx-auto h-10 w-10 text-brand" />
              <h2 className="mt-5 text-balance font-display text-3xl font-bold sm:text-4xl">
                Achas que tens o que é preciso?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Estamos sempre à procura de talento. Junta-te aos try-outs e
                mostra o teu valor para representar a OTMZ Esports.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <BrandButton href={DISCORD_URL}>
                  <Trophy className="h-4 w-4" /> Candidatar-me
                </BrandButton>
                <BrandButton href={DISCORD_URL} variant="outline">
                  <MessageCircle className="h-4 w-4" /> Falar com a staff
                </BrandButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
