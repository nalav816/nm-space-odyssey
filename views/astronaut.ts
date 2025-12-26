import { Astronauts } from "@/lib/prisma-client/client"

export type Astronaut = {
    id: string,
    price: number,
    modelUrl: string,
    isEngineer: boolean,
    isResearcher: boolean,
    isPilot: boolean
}

export function getAstronautView (a: any) : Astronaut {
    return {
        id: a.id,
        price: a.astronautData.price,
        modelUrl: a.astronautData.modelUrl,
        isEngineer: a.astronautData.isEngineer,
        isResearcher: a.astronautData.isResearcher,
        isPilot: a.astronautData.isPilot
    }
}