import { useState, useEffect } from "react"
import ColoredSprite from "./ColoredSprite"
import type { HTMLMotionProps } from "motion/react"
import useSpriteSize from "../hooks/useSpriteSize"
import { motion, MotionStyle } from "motion/react"

export default function TintedSprite({
    spriteUrl,
    tintIntensity = .3,
    tintColor = "blue",
    animate,
    transition,
    tintAnimate,
    tintTransition,
    className,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick
}: {
    spriteUrl: string,
    tintIntensity?: number,
    tintColor?: string,
    animate?: HTMLMotionProps<"div">["animate"],
    transition?: HTMLMotionProps<"div">["transition"],
    tintAnimate?: HTMLMotionProps<"div">["animate"],
    tintTransition?: HTMLMotionProps<"div">["transition"],
    className?: string,
    style?: MotionStyle,
    scale?: number,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    onClick?: () => void
}) {
    const [width, height] = useSpriteSize(spriteUrl)

    if(spriteUrl === "/sprites/makeshiftNosecone.png") console.log(width, height)

    return (
        <motion.div
            className= {`${className}`}
            animate={animate}
            transition={transition}
            style={style}
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
                style={{ width: width, height: height }}
                draggable={false}
            />
        </motion.div>)
}