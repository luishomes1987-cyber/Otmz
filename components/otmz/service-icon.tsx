import {
  Cpu,
  MousePointer2,
  Crosshair,
  Target,
  Gauge,
  Zap,
  MonitorCog,
  CircuitBoard,
  Trash2,
  Activity,
  Wifi,
  HardDriveDownload,
  Package,
  Gamepad2,
  type LucideIcon,
} from 'lucide-react'
import type { Service } from '@/lib/otmz-data'

const map: Record<Service['icon'], LucideIcon> = {
  windows: MonitorCog,
  mouse: MousePointer2,
  fortnite: Gamepad2,
  valorant: Crosshair,
  cs2: Target,
  gauge: Gauge,
  nvidia: Cpu,
  amd: Cpu,
  bios: CircuitBoard,
  trash: Trash2,
  fps: Zap,
  latency: Activity,
  wifi: Wifi,
  driver: HardDriveDownload,
  package: Package,
}

export function ServiceIcon({
  name,
  className,
}: {
  name: Service['icon']
  className?: string
}) {
  const Icon = map[name]
  return <Icon className={className} />
}
