import { useState, useRef, useEffect, useMemo } from "react"
import { usePlayer } from "./usePlayer";

export default function useRoom() : [number, number, React.Dispatch<React.SetStateAction<number>>] {
    const [player, _] = usePlayer();
    const astronautIds = useRef(new Set(player.astronauts.map(a => a.id)))
    const astronautCount = useRef(astronautIds.current.size)
    const [room, setRoom] = useState<number>(1);

    const countInRoom = useMemo(() => {
        return player.astronauts.filter(a => a.occupiedRoom == room).length
    }, [player.astronauts, room])

    useEffect(() => {
        if (player.astronauts.length > astronautCount.current) {
            const newAstronaut = player.astronauts.find(a => !astronautIds.current.has(a.id))!;
            if (room != newAstronaut.occupiedRoom) {
                setRoom(newAstronaut.occupiedRoom)
            }
           
        }

        astronautCount.current = player.astronauts.length
        astronautIds.current = new Set(player.astronauts.map(a => a.id))

    }, [player.astronauts])

    return [room, countInRoom, setRoom]
}