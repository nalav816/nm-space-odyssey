import { useRef, useEffect } from "react"
import { motion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"

export default function ColoredSprite(
    { spriteUrl, className, style, color="blue", animate, transition }: 
{ spriteUrl: string, className?: string, style?: React.CSSProperties, color?: string, animate?:HTMLMotionProps<"div">["animate"], transition?:HTMLMotionProps<"div">["transition"]}
) {
    const width = useRef(1)
    const height = useRef(1)

    useEffect(() => {
        const img = new Image()
        img.src = spriteUrl
        img.onload = () => {
            width.current = img.width * 2
            height.current = img.height *2 
        }

    }, [])

    return (
        <motion.div animate={animate} transition={transition} className={`${className}`} style={
            {
                ...{
                    maskImage: `url(${spriteUrl})`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskImage: `url(${spriteUrl})`,
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: "contain",
                    width: width.current,
                    height: height.current,
                    backgroundColor: "var(--color-" + color + ")"
                }, ...style
            }
        } />
    )
}