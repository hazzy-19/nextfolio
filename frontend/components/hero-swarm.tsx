'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function HeroSwarm() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        // Create a swarm of elements
        const count = 20
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'] // Blue, Purple, Pink, Emerald

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div')
            const size = Math.random() * 60 + 20 // Random size 20-80px
            const color = colors[Math.floor(Math.random() * colors.length)]

            el.className = 'absolute rounded-full blur-xl opacity-40 mix-blend-screen'
            el.style.width = `${size}px`
            el.style.height = `${size}px`
            el.style.backgroundColor = color
            el.style.left = `${Math.random() * 100}%`
            el.style.top = `${Math.random() * 100}%`

            containerRef.current.appendChild(el)

            // Random movement for each particle
            gsap.to(el, {
                x: `random(-200, 200)`,
                y: `random(-100, 100)`,
                scale: `random(0.5, 1.5)`,
                duration: `random(3, 8)`,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: Math.random() * 5
            })

            // Mouse interaction (repel/attract) could be added here, 
            // but let's stick to "organic swarm" for now as requested.
        }
    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            aria-hidden="true"
        />
    )
}
