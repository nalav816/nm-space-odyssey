import astronautData from "../data/astronauts.json"
import { Entity, OwnedEntity, getPrice } from "./entityService"
import { Player } from "./playerService"

export type AstronautName = keyof typeof astronautData

export interface Astronaut extends OwnedEntity{
    name: AstronautName
    isGeneratingDollars: boolean,
    lastCurrencyUpdate: number,
    occupiedSlot: number
}

export function isAstronaut(e: Entity) {
    return e.name in astronautData
}

export function getDollarsPerSecond(a: AstronautName | Astronaut): number {
    const name = typeof a === 'string' ? a : a.name
    return astronautData[name].dollarsPerSecond
}

export function isScientist(a: AstronautName | Astronaut): boolean {
    const name = typeof a === 'string' ? a : a.name
    return astronautData[name].isScientist
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

export function isVacantQuartersSpace(player: Player): boolean {
    const totalCapacity = player.astronautRoomCount * player.roomSpaceCap
    return player.astronauts.length < totalCapacity
}

export function getNextAvailableSlot(player: Player): { room: number, slot: number } {
    let slot = 1
    let room = 1

    player.astronauts.sort((a: Astronaut, b: Astronaut) => {
        if (a.occupiedArea != b.occupiedArea) {
            return a.occupiedArea - b.occupiedArea
        }

        return a.occupiedSlot - b.occupiedSlot
    })

    for (const a of player.astronauts) {
        if (a.occupiedSlot == slot && a.occupiedArea == room) {
            slot += 1
            if (slot > player.roomSpaceCap) {
                slot = 1
                room += 1
            }
        } else {
            break
        }
    }

    return {
        room,
        slot
    }
}

export function purchaseAstronaut(player: Player, astronautName: AstronautName): { player: Player, astronaut: Astronaut } | null {
    const price = getPrice({ name: astronautName } as Entity)
    
    if (price > player.netWorth) {
        return null
    }

    const { room, slot } = getNextAvailableSlot(player)
    const id = crypto.randomUUID()
    const newAstronaut: Astronaut = {
        id: id,
        name: astronautName,
        lastCurrencyUpdate: Date.now(),
        isGeneratingDollars: isScientist(astronautName),
        occupiedSlot: slot,
        occupiedArea: room
    }

    const newPlayer: Player = {
        ...player,
        netWorth: player.netWorth - price,
        astronauts: [...player.astronauts, newAstronaut]
    }

    return {
        player: newPlayer,
        astronaut: newAstronaut
    }
}