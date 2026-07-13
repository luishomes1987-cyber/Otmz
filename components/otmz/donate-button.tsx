'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { DONATE_URL } from '@/lib/otmz-data'

/**
 * Botão flutuante de donativos (SumUp), visível em todas as páginas no canto
 * inferior direito.
 */
export function DonateButton() {
  return (
    <motion.a
      href={DONATE_URL}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="group fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-lg transition-all duration-300 hover:brand-glow hover:brightness-110 md:bottom-6 md:right-6"
      aria-label="Fazer um donativo à OTMZ"
    >
      <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      <span>Doar</span>
    </motion.a>
  )
}
