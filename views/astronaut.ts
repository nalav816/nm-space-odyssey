import { Astronauts } from "@/lib/prisma-client/client"

export type Astronaut = {
    modelUrl: string,
    isEngineer: boolean,
    isResearcher: boolean,
    isPilot: boolean
}

export function getAstronautView (a: Astronauts) : Astronaut {
    return {
        modelUrl: a.modelUrl,
        isEngineer: a.isEngineer,
        isResearcher: a.isResearcher,
        isPilot: a.isPilot
    }
}