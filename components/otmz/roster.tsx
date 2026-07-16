'use client'

import Image from 'next/image'
import { SiFortnite } from 'react-icons/si'
import { FaTiktok, FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { roster, type Player, type PlayerSocial } from '@/lib/otmz-data'
import { Reveal, SectionHeading } from './ui'

const SOCIAL_META: Record<
  PlayerSocial['type'],
  { label: string; Icon: IconType | typeof SiFortnite }
> = {
  tiktok: { label: 'TikTok', Icon: FaTiktok },
  x: { label: 'X (Twitter)', Icon: FaXTwitter },
  tracker: { label: 'Fortnite Tracker', Icon: SiFortnite },
}

function PlayerCard({
  player,
  featured = false,
}: {
  player: Player
  featured?: boolean
}) {
  const avatarSize = featured ? 'h-36 w-36' : 'h-28 w-28'
  const avatarSizes = featured ? '144px' : '112px'
  const nameSize = featured ? 'text-3xl' : 'text-2xl'

  return (
    <div
      className={`group flex h-full flex-col items-center rounded-2xl border bg-card/60 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow ${
        featured ? 'border-brand/50 brand-glow' : 'border-border'
      }`}
    >
      {/* Foto redonda */}
      <div
        className={`relative overflow-hidden rounded-full ring-2 ring-brand/40 ring-offset-4 ring-offset-background transition-transform duration-300 group-hover:scale-105 ${avatarSize}`}
      >
        <Image
          src={player.avatar || '/placeholder-user.jpg'}
          alt={`Foto de ${player.name}`}
          fill
          sizes={avatarSizes}
          className="object-cover"
        />
      </div>

      {/* Nome */}
      <h3 className={`mt-5 font-display font-bold ${nameSize}`}>
        {player.name}
      </h3>

      {/* Cargo */}
      <span className="mt-2 inline-flex items-center rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-muted">
        {player.role}
      </span>

      {/* Icons das redes sociais */}
      <div className="mt-6 flex items-center gap-3">
        {player.socials.map((social) => {
          const { label, Icon } = SOCIAL_META[social.type]
          return (
            <a
              key={social.type}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${label} de ${player.name}`}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-all hover:border-brand/50 hover:text-brand"
            >
              <Icon className="h-4 w-4" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export function Roster() {
  // O Owner fica destacado e centrado em cima; o resto do elenco em baixo.
  const owner = roster.find((p) => p.role.toLowerCase() === 'owner') ?? roster[0]
  const others = roster.filter((p) => p !== owner)

  return (
    <section id="elenco" className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="Elenco"
        title="Os nossos jogadores"
        subtitle="Conhece quem representa a OTMZ Esports nas competições."
      />

      {/* Owner destacado no topo */}
      {owner && (
        <div className="mt-14 flex justify-center">
          <Reveal>
            <div className="w-full max-w-sm">
              <PlayerCard player={owner} featured />
            </div>
          </Reveal>
        </div>
      )}

      {/* Restante elenco */}
      {others.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((player, i) => (
            <Reveal key={player.name} delay={i * 0.08}>
              <PlayerCard player={player} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
