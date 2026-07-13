'use client'

import { motion, useInView } from 'framer-motion'
import { Cpu, Gauge, MousePointer2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { processCounter } from '@/lib/otmz-data'
import { Reveal } from './ui'

/* Utility: run an animation loop only while the element is on screen. */
function useLoop(cb: (t: number) => void, active: boolean) {
  const cbRef = useRef(cb)
  cbRef.current = cb
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      cbRef.current((now - start) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const nf = new Intl.NumberFormat('pt-PT')

/* ── FPS: climbs continuously so it feels practically infinite ── */
function FpsValue({ active }: { active: boolean }) {
  const [text, setText] = useState('2.000')
  const CYCLE = 3.6 // seconds per climb
  useLoop((t) => {
    const p = (t % CYCLE) / CYCLE
    const eased = easeOut(p)
    const value = Math.round(2_000 + eased * (999_999 - 2_000))
    setText(value >= 999_999 ? '999.999+' : nf.format(value))
  }, active)
  return <>{text}</>
}

/* ── Input delay: counts down to 0ms, then loops ── */
function InputDelayValue({ active }: { active: boolean }) {
  const [text, setText] = useState('35')
  const CYCLE = 4 // seconds: ~2.6s countdown + hold at 0
  useLoop((t) => {
    const p = (t % CYCLE) / CYCLE
    if (p > 0.65) {
      setText('0')
      return
    }
    const eased = easeOut(p / 0.65)
    setText(String(Math.max(0, Math.round(35 - eased * 35))))
  }, active)
  return <>{text}</>
}

/* ── Windows processes: 250 → 140, then loops ── */
function ProcessValue({ active }: { active: boolean }) {
  const [text, setText] = useState(String(processCounter.from))
  const CYCLE = 4
  useLoop((t) => {
    const p = (t % CYCLE) / CYCLE
    if (p > 0.65) {
      setText(String(processCounter.to))
      return
    }
    const eased = easeOut(p / 0.65)
    const v = Math.round(
      processCounter.from - eased * (processCounter.from - processCounter.to),
    )
    setText(String(v))
  }, active)
  return <>{text}</>
}

const CARDS = [
  {
    icon: Gauge,
    label: 'Frames por segundo',
    tag: 'Desempenho infinito',
    render: (a: boolean) => <FpsValue active={a} />,
    unit: 'FPS',
  },
  {
    icon: MousePointer2,
    label: 'Input Delay',
    tag: 'Resposta instantânea',
    render: (a: boolean) => <InputDelayValue active={a} />,
    unit: 'ms',
  },
  {
    icon: Cpu,
    label: 'Processos do Windows',
    tag: 'Sistema mais leve',
    render: (a: boolean) => <ProcessValue active={a} />,
    unit: 'ativos',
  },
] as const

export function PerfCounters() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-80px' })

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => {
          const Icon = c.icon
          return (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:brand-glow">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="relative flex items-center gap-2 text-brand-muted">
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-widest">
                    {c.tag}
                  </span>
                </div>

                <div className="relative mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tabular-nums text-glow sm:text-5xl">
                    {c.render(inView)}
                  </span>
                  <span className="font-display text-lg font-semibold text-muted-foreground">
                    {c.unit}
                  </span>
                </div>

                <p className="relative mt-2 text-sm text-muted-foreground">
                  {c.label}
                </p>

                <motion.div
                  aria-hidden
                  className="relative mt-4 h-1 overflow-hidden rounded-full bg-secondary"
                >
                  <motion.span
                    className="block h-full rounded-full bg-brand"
                    animate={{ width: ['20%', '100%', '20%'] }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
