import astronautData from "../data/astronauts.json"
import rocketData from "../data/rocketry.json"
import { AstronautName } from "./astronautService"
import { RocketComponentName } from "./rocketService"

export type EntityType = "astronaut" | "rocketComponent"
export type EntityName = AstronautName | RocketComponentName

export interface Entity {
    name: EntityName,
}

export interface OwnedEntity extends Entity {
    id: string,
    occupiedArea: number
}

export function getModel(e: Entity): string {
    if (e.name in astronautData) {
        return astronautData[e.name as AstronautName].modelUrl
    } else {
        return rocketData[e.name as RocketComponentName].modelUrl
    }
}

export function getShopIcon(e: Entity): string {
    if (e.name in astronautData) {
        return astronautData[e.name as AstronautName].shopIconUrl
    } else {
        return rocketData[e.name as RocketComponentName].shopIconUrl
    }
}

export function getRating(e: Entity): number {
    if (e.name in astronautData) {
        return astronautData[e.name as AstronautName].rating
    } else {
        return rocketData[e.name as RocketComponentName].rating
    }
}

export function getPrice(e: Entity): number {
    if (e.name in astronautData) {
        return astronautData[e.name as AstronautName].price
    } else {
        return rocketData[e.name as RocketComponentName].price
    }
}

export function isHiddenOnLock(e: Entity): boolean {
    if (e.name in astronautData) {
        return astronautData[e.name as AstronautName].isHiddenOnLock
    } else {
        return rocketData[e.name as RocketComponentName].isHiddenOnLock
    }
}

