import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const W = 260
const H = 260
const CX = W / 2
const CY = H / 2
const R_METAL = 16
const R_MAX = 118

const ARTEFACT_ANGLES = [0.4, 1.15, 1.9, 2.8, 3.6, 4.5, 5.4]

function getIntensity(r: number, theta: number): number {
  if (r < R_METAL) return 1.0

  let v = 0.18

  for (const a of ARTEFACT_ANGLES) {
    let d = Math.abs(theta - a)
    if (d > Math.PI) d = 2 * Math.PI - d
    if (d < 0.09) {
      const t = 1 - d / 0.09
      const fade = Math.max(0, 1 - (r - R_METAL) / (R_MAX - R_METAL))
      v += 0.72 * t * t * fade
    }
  }

  if (r > R_MAX) v *= Math.max(0, 1 - (r - R_MAX) / 12)

  return Math.min(1, v)
}

function toGray(v: number): number {
  return Math.round(Math.max(0, Math.min(255, v * 255)))
}

function drawCartesian(ctx: CanvasRenderingContext2D) {
  const img = ctx.createImageData(W, H)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x - CX
      const dy = y - CY
      const r = Math.sqrt(dx * dx + dy * dy)
      const theta = ((Math.atan2(dy, dx) + 2 * Math.PI) % (2 * Math.PI))
      const g = toGray(getIntensity(r, theta))
      const i = (y * W + x) * 4
      img.data[i] = g; img.data[i + 1] = g; img.data[i + 2] = g; img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)

  // circle boundary
  ctx.strokeStyle = 'rgba(100,180,255,0.5)'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.arc(CX, CY, R_MAX, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.setLineDash([])

  // axis cross
  ctx.strokeStyle = 'rgba(100,180,255,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(CX, CY - R_MAX - 6); ctx.lineTo(CX, CY + R_MAX + 6)
  ctx.moveTo(CX - R_MAX - 6, CY); ctx.lineTo(CX + R_MAX + 6, CY)
  ctx.stroke()

  // labels
  ctx.fillStyle = 'rgba(150,210,255,0.9)'
  ctx.font = '11px monospace'
  ctx.fillText('x', CX + R_MAX + 8, CY + 4)
  ctx.fillText('y', CX + 4, CY - R_MAX - 8)
  ctx.fillText('r', CX + 6, CY - 28)

  // metal label
  ctx.fillStyle = 'rgba(255,240,180,0.95)'
  ctx.font = 'bold 10px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('metal', CX, CY + 3)
  ctx.textAlign = 'left'
}

function drawPolar(ctx: CanvasRenderingContext2D) {
  const img = ctx.createImageData(W, H)
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const theta = (px / W) * 2 * Math.PI
      const r = ((H - 1 - py) / H) * (R_MAX + 12)
      const g = toGray(getIntensity(r, theta))
      const i = (py * W + px) * 4
      img.data[i] = g; img.data[i + 1] = g; img.data[i + 2] = g; img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)

  // axis labels
  ctx.fillStyle = 'rgba(150,210,255,0.9)'
  ctx.font = '11px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('0°', 4, H - 6)
  ctx.fillText('180°', W / 2, H - 6)
  ctx.fillText('360°', W - 6, H - 6)
  ctx.fillText('θ', W - 10, H - 18)

  ctx.textAlign = 'left'
  ctx.fillText('r', 4, 14)
  ctx.fillText('0', 4, H - 18)

  // separator line between metal zone and tissue
  ctx.strokeStyle = 'rgba(255,220,100,0.5)'
  ctx.lineWidth = 1
  ctx.setLineDash([3, 3])
  const yMetal = H - 1 - (R_METAL / (R_MAX + 12)) * H
  ctx.beginPath()
  ctx.moveTo(0, yMetal); ctx.lineTo(W, yMetal)
  ctx.stroke()
  ctx.setLineDash([])

  // metal label — right of separator line, above it
  ctx.fillStyle = 'rgba(255,220,100,0.9)'
  ctx.font = 'bold 9px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('metal (r<R) ↕', W - 4, yMetal - 4)
}

export function PolarTransformViz() {
  const { t } = useTranslation()
  const cartRef = useRef<HTMLCanvasElement>(null)
  const polarRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (cartRef.current) drawCartesian(cartRef.current.getContext('2d')!)
    if (polarRef.current) drawPolar(polarRef.current.getContext('2d')!)
  }, [])

  return (
    <div className="bg-gray-950 rounded-2xl p-6 border border-blue-900 shadow-xl">
      <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-1">
        {t('polmar.viz.title')}
      </h3>
      <p className="text-gray-400 text-xs mb-6">
        {t('polmar.viz.description')}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        {/* Cartesian */}
        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
          <span className="text-gray-300 text-xs font-mono">{t('polmar.viz.cartesian')}</span>
          <canvas
            ref={cartRef}
            width={W}
            height={H}
            className="rounded-lg border border-blue-900"
            style={{ imageRendering: 'pixelated', width: '100%', maxWidth: W, display: 'block' }}
          />
          <span className="text-gray-500 text-xs">(x, y)</span>
        </div>

        {/* Arrow — ↓ on mobile, → on desktop */}
        <div className="flex flex-col items-center gap-1 text-blue-400 shrink-0">
          <span className="text-2xl sm:hidden">↓</span>
          <span className="text-2xl hidden sm:block">→</span>
          <span className="text-xs text-gray-500">{t('polmar.viz.transform')}</span>
        </div>

        {/* Polar */}
        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
          <span className="text-gray-300 text-xs font-mono">{t('polmar.viz.polar')}</span>
          <canvas
            ref={polarRef}
            width={W}
            height={H}
            className="rounded-lg border border-blue-900"
            style={{ imageRendering: 'pixelated', width: '100%', maxWidth: W, display: 'block' }}
          />
          <span className="text-gray-500 text-xs">(θ, r)</span>
        </div>
      </div>

      <p className="text-gray-500 text-xs mt-5 text-center italic">
        {t('polmar.viz.caption')}
      </p>
    </div>
  )
}
