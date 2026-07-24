import { useEffect, useRef } from 'react'
import type { Bead } from './types'

type BeadProps = Omit<Bead, 'id'>

export const BeadAnimation = ({
  color,
  size,
  startX,
  startY,
  delay,
  duration,
  bounceHeight,
  rollDistance,
  rollDirection,
  stayOnGround,
  groundYOffset,
  freezeAt
}: BeadProps) => {
  const beadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = beadRef.current
    if (!el) return

    const groundY = window.innerHeight - size - 10 + groundYOffset

    const baseKeyframes = [
      {
        transform: `translate(${startX}px, ${startY}px) scale(1) rotate(0deg)`,
        opacity: 1
      },
      {
        transform: `translate(${
          startX + rollDirection * 20
        }px, ${groundY}px) scale(1.12) rotate(180deg)`,
        opacity: 1,
        offset: 0.15
      },
      {
        transform: `translate(${startX + rollDirection * 45}px, ${
          groundY - bounceHeight
        }px) scale(0.82) rotate(360deg)`,
        opacity: 1,
        offset: 0.3
      },
      {
        transform: `translate(${
          startX + rollDirection * 70
        }px, ${groundY}px) scale(1.08) rotate(540deg)`,
        opacity: 1,
        offset: 0.45
      },
      {
        transform: `translate(${startX + rollDirection * 95}px, ${
          groundY - bounceHeight * 0.75
        }px) scale(0.88) rotate(720deg)`,
        opacity: 1,
        offset: 0.58
      },
      {
        transform: `translate(${
          startX + rollDirection * 115
        }px, ${groundY}px) scale(1.05) rotate(900deg)`,
        opacity: 1,
        offset: 0.7
      },
      {
        transform: `translate(${startX + rollDirection * 130}px, ${
          groundY - bounceHeight * 0.4
        }px) scale(0.94) rotate(1080deg)`,
        opacity: 1,
        offset: 0.8
      },
      {
        transform: `translate(${
          startX + rollDirection * 140
        }px, ${groundY}px) scale(1) rotate(1260deg)`,
        opacity: 1,
        offset: 0.88
      }
    ]

    let finalKeyframes

    if (stayOnGround) {
      finalKeyframes = [
        ...baseKeyframes,
        {
          transform: `translate(${
            startX + rollDirection * 50
          }px, ${groundY}px) scale(0.92) rotate(1260deg)`,
          opacity: 0.85
        }
      ]
    } else {
      const freezeX = startX + rollDirection * (50 + freezeAt * 180)
      const freezeY = groundY - bounceHeight * (0.3 + freezeAt * 0.6)
      const freezeScale = 0.75 + freezeAt * 0.3
      const freezeRotate = 500 + freezeAt * 900

      finalKeyframes = [
        ...baseKeyframes,
        {
          transform: `translate(${freezeX}px, ${freezeY}px) scale(${freezeScale}) rotate(${freezeRotate}deg)`,
          opacity: 0.7 + freezeAt * 0.3
        }
      ]
    }

    el.animate(finalKeyframes, {
      duration: duration,
      delay: delay,
      easing: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
      fill: 'forwards'
    })
  }, [
    startX,
    startY,
    delay,
    duration,
    bounceHeight,
    rollDistance,
    rollDirection,
    stayOnGround,
    groundYOffset,
    freezeAt,
    size
  ])

  return (
    <div
      ref={beadRef}
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow:
          '0 4px 12px rgba(0,0,0,0.2), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 3px 6px rgba(255,255,255,0.3)',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        opacity: 0,
        willChange: 'transform'
      }}
    />
  )
}
