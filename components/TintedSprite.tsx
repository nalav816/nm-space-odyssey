"use client"

import { useRef, useEffect } from "react"

export default function TintedSprite({
    spriteUrl,
    tintIntensity = .3,
    className,
    scale = 2,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick
}: {
    spriteUrl: string,
    tintIntensity?: number,
    className?: string,
    scale?: number,
    style?: React.CSSProperties
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    onClick?: () => void
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image()
        img.src = spriteUrl

        img.onload = () => {
            //All sprites in this game are scaled by 2
            canvas.height = img.height * scale;
            canvas.width = img.width * scale;

            //Fetching color attribute
            const styles = getComputedStyle(canvas)
            const color = styles.color;
            const imageRendering = styles.imageRendering
            const rgbaColor = color.replace("rgb", "rgba").replace(")", `, ${tintIntensity})`);

            if (imageRendering == "pixelated" || imageRendering == "crisp-edges") ctx.imageSmoothingEnabled = false

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = rgbaColor
            ctx.globalCompositeOperation = "source-atop"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.globalCompositeOperation = "source-over"
        }

    }, [tintIntensity, className, spriteUrl])

    return (<canvas onClick={onClick} style={style} className={className} ref={canvasRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />)
}