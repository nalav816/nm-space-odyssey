import rocketData from "../data/rocketry.json"
import { Entity } from "./entityService"

export type RocketComponentName = keyof typeof rocketData

export interface Rocket {
    id: string
    occupiedPlot: number
    components: RocketComponent[]

}

export interface RocketComponent extends Entity {
   name: RocketComponentName
}

export function isEngine(r: RocketComponent) {
    return rocketData[r.name].isEngine
}