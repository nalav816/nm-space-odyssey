export type Astronaut = {
    id: string,
    price: number,
    modelUrl: string,
    isEngineer: boolean,
    isScientist: boolean,
    isPilot: boolean,
    isGeneratingDollars: boolean,
    dollarsPerSecond: number,
    lastCurrencyUpdate: string,


}

export function getAstronautView (a: any) : Astronaut {
    return {
        id: a.id,
        price: a.astronautData.price,
        modelUrl: a.astronautData.modelUrl,
        isEngineer: a.astronautData.isEngineer,
        isScientist: a.astronautData.isScientist,
        isPilot: a.astronautData.isPilot,
        isGeneratingDollars: a.isGeneratingDollars,
        dollarsPerSecond: a.astronautData.dollarsPerSecond,
        lastCurrencyUpdate: a.lastCurrencyUpdate.toISOString()
    }
}