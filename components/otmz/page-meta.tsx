'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { divisionMeta, type DivisionId } from '@/lib/otmz-data'

/**
 * Etiqueta fixa no canto superior esquerdo que mostra quando a divisão/aba
 * ativa foi criada. Ex.: "OTMZ criada em Maio 2025".
 */
export function PageMeta({ division }: { division: DivisionId }) {
  const meta = divisionMeta[division]

  return (
    <div className="pointer-events-none fixed left-3 top-24 z-40 md:left-5 md:top-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={division}
          initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-xl"
        >
          <CalendarDays className="h-3.5 w-3.5 text-brand" />
          <span>
            <span className="font-semibold text-foreground">{meta.label}</span>{' '}
            criada em{' '}
            <span className="font-semibold text-foreground">
              {meta.createdAt}
            </span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
