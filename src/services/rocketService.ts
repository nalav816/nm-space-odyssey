import rocketData from "../data/rocketry.json"
import { Entity, OwnedEntity } from "./entityService"

export type RocketComponentName = keyof typeof rocketData

export interface Rocket extends OwnedEntity {
    components: RocketComponent[]

}

export interface RocketComponent extends OwnedEntity {
    name: RocketComponentName
}

export function isEngine(r: RocketComponent) {
    return rocketData[r.name].isEngine
}