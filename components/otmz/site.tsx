'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { DivisionId } from '@/lib/otmz-data'
import { DivisionBackground } from './backgrounds'
import { DivisionEsports } from './division-esports'
import { DivisionOtmz } from './division-otmz'
import { DivisionZoneWars } from './division-zonewars'
import { DonateButton } from './donate-button'
import { Navbar } from './navbar'
import { PageMeta } from './page-meta'
import { StatsSection } from './stats-section'
import { SupportBanner } from './support-banner'

export function Site() {
  const [division, setDivision] = useState<DivisionId>('otmz')

  const handleChange = (id: DivisionId) => {
    if (id === division) return
    setDivision(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div data-division={division} className="relative min-h-screen">
      <DivisionBackground />
      <SupportBanner />
      <Navbar active={division} onChange={handleChange} />
      <PageMeta division={division} />
      <DonateButton />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={division}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {division === 'otmz' && <DivisionOtmz />}
            {division === 'zonewars' && <DivisionZoneWars />}
            {division === 'esports' && <DivisionEsports />}
          </motion.div>
        </AnimatePresence>

        <StatsSection division={division} />
      </main>
    </div>
  )
}
