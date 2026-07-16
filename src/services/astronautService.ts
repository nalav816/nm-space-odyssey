import astronautData from "../data/astronauts.json"
import { usePlayer } from "../hooks/usePlayer"
import { Player } from "./playerService"

export type AstronautName = keyof typeof astronautData

export type Astronaut = {
    id: string,
    name: AstronautName,
    isGeneratingDollars: boolean,
    lastCurrencyUpdate: number,
    occupiedSlot: number,
    occupiedRoom: number,
}

export function getModel(astronaut: Astronaut): string {
    return astronautData[astronaut.name].modelUrl
}

export function getShopIcon(astronaut: Astronaut): string {
    return astronautData[astronaut.name].shopIconUrl
}

export function getRating(astronaut: Astronaut): number {
    return astronautData[astronaut.name].rating
}

export function getPrice(astronaut: Astronaut): number {
    return astronautData[astronaut.name].price
}

export function getDollarsPerSecond(astronaut: Astronaut): number {
    return astronautData[astronaut.name].dollarsPerSecond
}

export function isHiddenOnLock(astronaut: Astronaut): boolean {
    return astronautData[astronaut.name].isHiddenOnLock
}

export function isScientist(astronaut: Astronaut): boolean {
    return astronautData[astronaut.name].isScientist
}

export function isEngineer(astronaut: Astronaut): boolean {
    return astronautData[astronaut.name].isEngineer
}

export function isPilot(astronaut: Astronaut): boolean {
    return astronautData[astronaut.name].isPilot
}

//If an optional astronaut is not provided, the following functions run for every astronaut
export function updateCurencyTimestamps(player: Player, astronaut?:Astronaut) {
    const now = Date.now()
    const newPlayer = {
        ...player,
        astronauts: player.astronauts.map((a: Astronaut) => 
            !astronaut || a.id == astronaut.id ?
            {
                ...a,
                lastCurrencyUpdate: now
            } :
            a
    )}
    
    return newPlayer
}

export function getIdleIncomes(player: Player, astronaut?: Astronaut) {
    const now = Date.now();
    let totalEarnedIncome = 0;

    for (const a of player.astronauts) {
        if (!astronaut || astronaut.id == a.id){
            const secondsElapsed = Math.round((now - a.lastCurrencyUpdate) / 1000);
            const earnedIncome = secondsElapsed * getDollarsPerSecond(a)
            totalEarnedIncome += earnedIncome;
            if (astronaut) break
        }
    }

    return totalEarnedIncome
}