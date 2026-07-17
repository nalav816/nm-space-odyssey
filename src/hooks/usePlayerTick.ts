import { Player, tick } from "../services/playerService";
import { GameContext } from "../context/GameProvider";
import { useEffect, useContext } from "react";

export function usePlayerTick(setPlayer:React.Dispatch<React.SetStateAction<Player>>) {
    const [setOnGameTick, _] = useContext(GameContext)!

    useEffect(() => {
        const handleTick = () => {
            setPlayer(prev => tick(prev))
        }

        setOnGameTick(prev => ([
            ...prev,
            handleTick
        ]))

        return () => setOnGameTick(prev => prev.filter(callback => callback !== handleTick))

    }, [])
}