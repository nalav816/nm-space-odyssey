"use client"
import TintedSprite from "./TintedSprite"
import { useState, useEffect } from "react"
import GameObjectMenu from "./GameObjectMenu"
import { setMaxListeners } from "events"

export type EmployeeData = {
    name: string,
    rating: number,
    modelUrl: string,
    shopIconUrl: string,
}

export function Employee({ employeeData }: { employeeData: EmployeeData }) {
    const MAX_TINT_INTENSITY = .2
    const [tintAnim, setTintAnim] = useState<number>(0)
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const onMouseEnter = () => {
        setIsMouseOver(true)
    }

    const onMouseLeave = () => {
        setIsMouseOver(false)
    }

    const onClick = () => {
        setIsSelected((prev) => !prev)
    }

    useEffect(() => {
        let frame: number;

        const animate = () => {
            setTintAnim((prev) => {
                const goal = isMouseOver && !isSelected ? 1 : 0
                const delta = .006
                if (prev + delta <= goal) {
                    return prev + delta
                } else {
                    return isSelected ? .5 : 0
                }
            })

            frame = requestAnimationFrame(animate)
        }

        animate()

        return () => cancelAnimationFrame(frame)

    }, [isMouseOver, isSelected])

    return (
        <div className="relative">
            <TintedSprite className="hover:cursor-pointer image-pixelated text-white"
                spriteUrl={employeeData.modelUrl}
                tintIntensity={tintAnim <= .5 ? tintAnim * MAX_TINT_INTENSITY * 2 : MAX_TINT_INTENSITY - ((tintAnim - .5) * 2) * MAX_TINT_INTENSITY}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />
            {isSelected && <GameObjectMenu/>}
        </div>

    )
}