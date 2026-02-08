'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CursorFollower() {
    const [isVisible, setIsVisible] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const swarmSize = 12

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)
        document.body.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
            document.body.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [mouseX, mouseY, isVisible])

    if (!isVisible) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block">
            {Array.from({ length: swarmSize }).map((_, i) => (
                <Dot key={i} index={i} mouseX={mouseX} mouseY={mouseY} count={swarmSize} />
            ))}
        </div>
    )
}

function Dot({ index, mouseX, mouseY, count }: { index: number, mouseX: any, mouseY: any, count: number }) {
    // Use slightly different spring physics for each dot to create separation
    const springConfig = {
        damping: 20 + (index * 2),
        stiffness: 150 + (index * 10),
        mass: 0.5 + (index * 0.1)
    }

    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    return (
        <motion.div
            className="absolute rounded-full bg-primary"
            style={{
                width: 8 + (index % 3) * 2, // Varying sizes
                height: 8 + (index % 3) * 2,
                x,
                y,
                translateX: '-50%',
                translateY: '-50%',
                opacity: 0.6 - (index / count) * 0.4, // Fade out trailing dots
            }}
        />
    )
}
