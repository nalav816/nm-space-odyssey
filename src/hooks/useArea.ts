import { useState, useRef, useEffect, useMemo } from "react"
import { usePlayer } from "./usePlayer";

//area is the general term for both astronaut rooms and rocket plots
export type AreaType = "room" | "plot"

export function useArea(areaType: AreaType) {
    const [player, _] = usePlayer();
    const entities = areaType == "room" ? player.astronauts : player.rockets
    const entityIds = useRef(new Set(entities.map(a => a.id)))
    const entityCount = useRef(entityIds.current.size)
    const [area, setArea] = useState(1);

    //auto scrolling logic
    useEffect(() => {
        if (entities.length > entityIds.current.size) {
            const newEntity = entities.find(e => !entityIds.current.has(e.id));
            if (area != newEntity.occupiedArea) {
                setArea(newEntity.occupiedArea)
            }
        }

        entityCount.current = entities.length
        entityIds.current = new Set(entities.map(a => a.id))

    }, [entities])

    return [area, setArea]
}