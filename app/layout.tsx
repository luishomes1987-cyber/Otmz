import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Rajdhani } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-rajdhani',
})

export const metadata: Metadata = {
  title: 'OTMZ — Otimização, ZoneWars & Esports',
  description:
    'OTMZ é um ecossistema de gaming e tecnologia: otimizações profissionais de PC, torneios competitivos de Fortnite (ZoneWars) e uma organização de esports portuguesa.',
  keywords: [
    'OTMZ',
    'otimização PC',
    'FPS boost',
    'ZoneWars',
    'Fortnite',
    'scrims',
    'customs',
    'esports Portugal',
    'input lag',
    'tweaks Windows',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'OTMZ — Otimização, ZoneWars & Esports',
    description:
      'Performance, competição e esports num só ecossistema. Otimizações de PC, torneios de Fortnite e uma organização de esports.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${rajdhani.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
