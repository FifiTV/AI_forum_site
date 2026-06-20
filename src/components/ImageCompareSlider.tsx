import { useState, useRef, useCallback, useEffect } from 'react'

interface Props {
  leftSrc: string
  rightSrc: string
  leftLabel?: string
  rightLabel?: string
}

export function ImageCompareSlider({ leftSrc, rightSrc, leftLabel, rightLabel }: Props) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)))
  }, [])

  useEffect(() => {
    if (!dragging) return
    const onMove    = (e: MouseEvent) => updatePosition(e.clientX)
    const onUp      = () => setDragging(false)
    const onTMove   = (e: TouchEvent) => { e.preventDefault(); updatePosition(e.touches[0].clientX) }
    const onTEnd    = () => setDragging(false)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
    document.addEventListener('touchmove', onTMove, { passive: false })
    document.addEventListener('touchend',  onTEnd)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
      document.removeEventListener('touchmove', onTMove)
      document.removeEventListener('touchend',  onTEnd)
    }
  }, [dragging, updatePosition])

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-xl shadow-2xl cursor-col-resize"
      style={{ touchAction: 'none' }}
      onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX); e.preventDefault() }}
      onTouchStart={(e) => { setDragging(true); updatePosition(e.touches[0].clientX) }}
    >
      {/* Right image — bottom layer, always fully visible */}
      <img src={rightSrc} alt="right" className="w-full block" draggable={false} />

      {/* Left image — top layer, clipped to reveal only the left portion */}
      <img
        src={leftSrc}
        alt="left"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* Divider */}
      <div className="absolute inset-y-0 flex items-center pointer-events-none" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.6)] -translate-x-1/2" />
        <div className="relative z-10 w-10 h-10 -translate-x-1/2 rounded-full bg-white shadow-xl flex items-center justify-center ring-2 ring-white/60">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 4L1 9L5 14M13 4L17 9L13 14" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      {leftLabel && (
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-md backdrop-blur-sm pointer-events-none">
          {leftLabel} →
        </span>
      )}
      {rightLabel && (
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-md backdrop-blur-sm pointer-events-none">
          ← {rightLabel}
        </span>
      )}
    </div>
  )
}
