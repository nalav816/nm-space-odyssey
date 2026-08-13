import { useState, useRef } from "react"
import { playSound } from "../services/audioSevice"
import TintedSprite from "./TintedSprite"

const MAX_TINT_INTENSITY = .2

export default function SelectableSprite(
    {
        className,
        spriteUrl,
        isMouseOver,
        setIsMouseOver,
        isSelected,
        setIsSelected,
        onSelection
    }
        :
        {
            className?: string,
            spriteUrl: string,
            isMouseOver: boolean,
            setIsMouseOver: React.Dispatch<React.SetStateAction<boolean>>,
            isSelected: boolean,
            setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
            onSelection?: () => any

        }
) {
    const debounce = useRef<null | NodeJS.Timeout>(null)

    const onMouseEnter = () => {
        setIsMouseOver(true)
    }

    const onMouseLeave = () => {
        setIsMouseOver(false)
    }

    const onClick = () => {
        if (!debounce.current) {
            if (!isSelected) {
                if (onSelection) onSelection()
                playSound("selection", .3)
            }
            setIsSelected(prev => !prev)
            debounce.current = setTimeout(() => {
                debounce.current = null
            }, 250)
        }
    }

    return (
        <TintedSprite
            className={`relative z-30 hover:cursor-pointer image-pixelated text-white ${className}`}
            spriteUrl={spriteUrl}
            tintColor="white"
            tintIntensity={isSelected ? MAX_TINT_INTENSITY : 0}
            tintAnimate={isMouseOver && !isSelected ? {
                opacity: ["0%", (MAX_TINT_INTENSITY * 100) + "%", "0%"]
            } : {}}
            tintTransition={isMouseOver && !isSelected ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            } : {}}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        />

    )

}