import astronautData from "../data/astronauts.json"
import { Entity, EntityName } from "./entityService"
import { Player } from "./playerService"

export type AstronautName = keyof typeof astronautData

export interface Astronaut extends Entity{
    name: AstronautName
    isGeneratingDollars: boolean,
    lastCurrencyUpdate: number,
    occupiedSlot: number,
    occupiedRoom: number,
}

export function isAstronaut(e: Entity) {
    return e.name in astronautData
}

export function getDollarsPerSecond(a: Astronaut): number {
    return astronautData[a.name].dollarsPerSecond
}

export function isScientist(a: Astronaut): boolean {
    return astronautData[a.name].isScientist
}

export function isEngineer(a: Astronaut): boolean {
    return astronautData[a.name].isEngineer
}

export function isPilot(a: Astronaut): boolean {
    return astronautData[a.name].isPilot
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