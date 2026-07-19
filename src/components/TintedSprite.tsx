import { useRef, useEffect } from "react"
import ColoredSprite from "./ColoredSprite"
import type { HTMLMotionProps } from "motion/react"

export default function TintedSprite({
    spriteUrl,
    tintIntensity = .3,
    tintColor = "blue",
    tintAnimate,
    tintTransition,
    className,
    onMouseEnter,
    onMouseLeave,
    onClick
}: {
    spriteUrl: string,
    tintIntensity?: number,
    tintColor?: string,
    tintAnimate?: HTMLMotionProps<"div">["animate"]
    tintTransition?: HTMLMotionProps<"div">["transition"]
    className?: string,
    scale?: number,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    onClick?: () => void
}) {
    const width = useRef(1)
    const height = useRef(1)

    useEffect(() => {
        const img = new Image()
        img.src = spriteUrl
        img.onload = () => {
            width.current = img.width * 2
            height.current = img.height * 2
        }

    }, [])

    return (
        <div
            className= {`relative ${className}`}
        >
            <ColoredSprite
                spriteUrl={spriteUrl}
                className="pointer-events-none image-pixelated absolute top-0 left-0"
                color = {tintColor}
                style={{ opacity: (tintIntensity * 100) + "%" }}
                animate={tintAnimate}
                transition={tintTransition}
            />
            <img
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                className="image-pixelated"
                src={spriteUrl} alt={"sprite"}
                style={{ width: width.current, height: height.current }}
                draggable={false}
            />
        </div>)
}