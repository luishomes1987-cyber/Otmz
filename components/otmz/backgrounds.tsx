'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

/* Particle canvas whose particles assemble the word "OTMZ" and scatter on hover */
export function ParticleField({
  density = 60,
  text = 'OTMZ',
}: {
  density?: number
  text?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = {
      x: number
      y: number
      vx: number
      vy: number
      // home = target position that forms the text
      hx: number
      hy: number
      r: number
      hasHome: boolean
      // which letter (0..n-1) this particle belongs to, -1 for ambient
      letter: number
    }
    let particles: P[] = []
    const letters = Array.from(text)

    // timing for the "reassemble from scratch" cycle
    const cycleLength = 10000 // reform every 1 minute
    const revealStep = 750 // ms between each letter appearing
    let cycleStart = performance.now()

    // pointer position in css pixels (null when outside)
    const pointer = { x: -9999, y: -9999 }

    const parent = canvas.parentElement!

    // Sample the rendered text into target points, tagging each with its letter index.
    const buildTargets = (): { x: number; y: number; letter: number }[] => {
      const off = document.createElement('canvas')
      off.width = Math.max(1, Math.floor(w))
      off.height = Math.max(1, Math.floor(h))
      const octx = off.getContext('2d')
      if (!octx) return []
      const fontSize = Math.min(w * 0.22, h * 0.7)
      octx.fillStyle = '#fff'
      octx.textAlign = 'left'
      octx.textBaseline = 'middle'
      octx.font = `900 ${fontSize}px system-ui, sans-serif`

      // Work out each letter's horizontal band so we can classify pixels.
      const widths = letters.map((ch) => octx.measureText(ch).width)
      const totalWidth = widths.reduce((a, b) => a + b, 0)
      let cursor = w / 2 - totalWidth / 2
      const bands = letters.map((ch, i) => {
        const start = cursor
        cursor += widths[i]
        return { start, end: cursor }
      })

      octx.fillText(text, w / 2 - totalWidth / 2, h / 2)

      const data = octx.getImageData(0, 0, off.width, off.height).data
      const targets: { x: number; y: number; letter: number }[] = []
      const step = Math.max(4, Math.round(fontSize / 26))
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const alpha = data[(y * off.width + x) * 4 + 3]
          if (alpha > 128) {
            const letter = bands.findIndex((b) => x >= b.start && x < b.end)
            targets.push({ x, y, letter: letter === -1 ? letters.length - 1 : letter })
          }
        }
      }
      return targets
    }

    const assign = () => {
      const targets = buildTargets()
      // ambient particles that never form the text
      const ambient = density
      const count = targets.length + ambient
      particles = Array.from({ length: count }, (_, i) => {
        const t = targets[i]
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          hx: t ? t.x : 0,
          hy: t ? t.y : 0,
          r: t ? Math.random() * 1.2 + 0.9 : Math.random() * 1.4 + 0.4,
          hasHome: !!t,
          letter: t ? t.letter : -1,
        }
      })
      cycleStart = performance.now()
    }

    const scatter = () => {
      for (const p of particles) {
        if (!p.hasHome) continue
        p.x = Math.random() * w
        p.y = Math.random() * h
        p.vx = (Math.random() - 0.5) * 0.6
        p.vy = (Math.random() - 0.5) * 0.6
      }
    }

    const resize = () => {
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      assign()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    // listen on the parent so hovering the section moves the particles
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)

    const getBrand = () => {
      const c = getComputedStyle(canvas).getPropertyValue('color').trim()
      return c || 'rgba(255,255,255,0.8)'
    }

    const repelRadius = 90

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      const color = getBrand()

      // cycle: scatter everything, then reveal letters one by one, hold, repeat
      const now = performance.now()
      let elapsed = now - cycleStart
      if (elapsed >= cycleLength) {
        scatter()
        cycleStart = now
        elapsed = 0
      }
      // how many letters have re-formed so far this cycle
      const revealed = Math.min(letters.length, Math.floor(elapsed / revealStep) + 1)

      for (const p of particles) {
        // repel from pointer
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius
          const ang = Math.atan2(dy, dx)
          p.vx += Math.cos(ang) * force * 1.6
          p.vy += Math.sin(ang) * force * 1.6
        }

        // a lettered particle only springs home once its letter's turn arrives
        const active = p.hasHome && p.letter < revealed

        if (active) {
          // spring back toward its letter position
          p.vx += (p.hx - p.x) * 0.012
          p.vy += (p.hy - p.y) * 0.012
          p.vx *= 0.88
          p.vy *= 0.88
        } else {
          // ambient drift with light friction
          p.vx *= 0.96
          p.vy *= 0.96
          if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.1
          if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.1
        }

        p.x += p.vx
        p.y += p.vy

        if (!active) {
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0
        }

        ctx.beginPath()
        ctx.fillStyle = color
        ctx.globalAlpha = active ? 0.85 : 0.4
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [density, text])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 text-brand"
    />
  )
}

/* Full-bleed background layer that reacts to the active division */
export function DivisionBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* animated brand glows */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-brand/20 blur-[130px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10%] top-1/3 h-[460px] w-[460px] rounded-full bg-brand/15 blur-[140px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
