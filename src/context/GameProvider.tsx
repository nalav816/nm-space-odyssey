import { useState, useEffect, createContext } from "react";

export const GameContext = createContext<[
    React.Dispatch<React.SetStateAction<(() => void)[]>>,
    React.Dispatch<React.SetStateAction<((delta: number) => void)[]>>
] | null>(null)

export default function GameProvider({children} : {children:React.ReactNode}){
    const [onGameTick, setOnGameTick] = useState<(() => void)[]>([])
    const [onGameAnimationTick, setOnGameAnimationTick] = useState<((delta: number) => void)[]>([])

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleTick = () => {
            for (const callback of onGameTick) {
                callback()
            }

            timer = setTimeout(handleTick, 1000)
        }

        timer = setTimeout(handleTick, 1000)

        return () => clearTimeout(timer)
    }, [onGameTick])

    useEffect(() => {
        let frame: number;

        const handleTick = (delta: number) => {
            for (const callback of onGameAnimationTick) {
                callback(delta)
            }
            frame = requestAnimationFrame(handleTick)
        }

        frame = requestAnimationFrame(handleTick)

        return () => cancelAnimationFrame(frame)
    }, [onGameAnimationTick])

    return (
        <GameContext value = {[setOnGameTick, setOnGameAnimationTick]}>
            {children}
        </GameContext>
    )
}