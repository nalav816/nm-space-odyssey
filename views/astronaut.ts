import { Astronauts } from "@/lib/prisma-client/client"

export type Astronaut = {
    id: string,
    price: number,
    modelUrl: string,
    isEngineer: boolean,
    isScientist: boolean,
    isPilot: boolean
}

export function getAstronautView (a: any) : Astronaut {
    return {
        id: a.id,
        price: a.astronautData.price,
        modelUrl: a.astronautData.modelUrl,
        isEngineer: a.astronautData.isEngineer,
        isScientist: a.astronautData.isResearcher,
        isPilot: a.astronautData.isPilot
    }
}