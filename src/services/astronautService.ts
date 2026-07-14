import astronautData from "../data/astronauts.json"

export type AstronautName = keyof typeof astronautData

export type Astronaut = {
    id: string,
    name: AstronautName,
    isGeneratingDollars: boolean,
    lastCurrencyUpdate: string,
    occupiedSlot: number,
    occupiedRoom: number,
}

export function getModel(astronaut: Astronaut) : string {
    return astronautData[astronaut.name].modelUrl
}

export function getShopIcon(astronaut: Astronaut) : string {
    return astronautData[astronaut.name].shopIconUrl
}

export function getRating(astronaut: Astronaut) : number {
    return astronautData[astronaut.name].rating
}

export function getPrice(astronaut: Astronaut) : number {
    return astronautData[astronaut.name].price
}

export function getDollarsPerSecond(astronaut: Astronaut) : number {
    return astronautData[astronaut.name].dollarsPerSecond
}

export function isHiddenOnLock(astronaut: Astronaut) : boolean {
    return astronautData[astronaut.name].isHiddenOnLock
}

export function isScientist(astronaut: Astronaut) : boolean {
    return astronautData[astronaut.name].isScientist
}

export function isEngineer(astronaut: Astronaut) : boolean {
    return astronautData[astronaut.name].isEngineer
}

export function isPilot(astronaut: Astronaut) : boolean {
    return astronautData[astronaut.name].isPilot
}

export function updateCurencyTimestamps(){

}

export function computeIdleIncome(){

}