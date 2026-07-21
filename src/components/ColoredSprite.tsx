import { useState, useEffect } from "react"
import { motion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"
import useSpriteSize from "../hooks/useSpriteSize"

export default function ColoredSprite(
    { spriteUrl, className, style, color = "blue", animate, transition }:
        { spriteUrl: string, className?: string, style?: React.CSSProperties, color?: string, animate?: HTMLMotionProps<"div">["animate"], transition?: HTMLMotionProps<"div">["transition"] }
) {
    const [width, height] = useSpriteSize(spriteUrl)

    return (
        <motion.div animate={animate} transition={transition} className={`image-pixelated ${className}`} style={
            {
                ...{
                    maskImage: `url(${spriteUrl})`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskImage: `url(${spriteUrl})`,
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: "contain",
                    width: width,
                    height: height,
                    backgroundColor: "var(--color-" + color + ")"
                }, ...style
            }
        } />
    )
}