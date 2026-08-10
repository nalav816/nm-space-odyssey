import { useCallback, useEffect, useState } from "react"

export interface DollarParticle {
    id: string
    value: number | string
    originX: number
    originY: number
    driftX: number
    driftY: number
    duration: number
}

export function useDollarParticle() {
    const [particles, setParticles] = useState<DollarParticle[]>([])

    const removeParticle = useCallback((particleId: string) => {
        setParticles((prev) => prev.filter((particle) => particle.id !== particleId))
    }, [])

    const addParticle = useCallback((particle: Omit<DollarParticle, "id">) => {
        const particleWithId = {
            ...particle,
            id: crypto.randomUUID(),
        }

        setParticles((prev) => [...prev, particleWithId])

        window.setTimeout(() => {
            removeParticle(particleWithId.id)
        }, particle.duration * 1000)
    }, [removeParticle])

    useEffect(() => {
        return () => {
            setParticles([])
        }
    }, [])

    return { particles, addParticle }
}