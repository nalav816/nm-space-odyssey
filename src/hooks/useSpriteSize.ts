import { useEffect, useState } from "react";
const SPRITE_SCALE_FACTOR = 2

//Fetches accurate sizing from sprite image
export default function useSpriteSize(spriteUrl:string) {
    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(1)

    useEffect(() => {
        const img = new Image()
        img.src = spriteUrl
        img.onload = () => {
            setWidth(img.width * SPRITE_SCALE_FACTOR)
            setHeight(img.height * SPRITE_SCALE_FACTOR)
        }

    }, [])

    return [width, height]
}