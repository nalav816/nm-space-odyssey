import { motion } from "motion/react"
import { useState } from "react"
import { useParticle } from "../hooks/useParticle"
import { usePlayer } from "../hooks/usePlayer"
import TintedSprite from "./TintedSprite"

export default function Earth({ }) {
    const awardAmount = 1
    const [ _, setPlayer] = usePlayer()
    const [isHovered, setIsHovered] = useState(false)
    const {particles, addParticle} = useParticle()
    const clickSound = new Audio("/audio/earthClick.mp3")

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPlayer((prev) => ({
            ...prev,
            netWorth: prev.netWorth + awardAmount,
        }))

        const rect = event.currentTarget.getBoundingClientRect()
        const originX = event.clientX - rect.left - rect.width / 2
        const originY = event.clientY - rect.top - rect.height / 2

        addParticle({
            value: awardAmount,
            originX,
            originY,
            driftX: -10 + Math.random() * 20,
            driftY: -80 + Math.random() * -20,
            duration: Math.random() * 0.5 + 1.2,
        })

        clickSound.play()
    }

    return (
        <button
            className="relative p-1 rounded-full border-blue-dark border-dashed border-2 bg-blue-darker"
            onClick={handleClick}
        >
            <motion.div
                whileTap={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="relative z-20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <TintedSprite tintColor="blue-lightest" className="relative z-20" tintIntensity={isHovered ? 0.3 : 0} spriteUrl="/sprites/earth.png" />
            </motion.div>

            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="pointer-events-none absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-green-light text-glow-green text-lg"
                    initial={{ x: particle.originX, y: particle.originY, opacity: 1, scale: 1 }}
                    animate={{ x: particle.originX + particle.driftX, y: particle.originY + particle.driftY, opacity: 0, scale: 0 }}
                    transition={{ duration: particle.duration, ease: "easeOut" }}
                >
                    +{particle.value}
                </motion.div>
            ))}
        </button>
    )
}