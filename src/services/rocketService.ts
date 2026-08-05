import rocketData from "../data/rocketry.json"
import {  OwnedEntity, getPrice, isPlaceholder as getIsPlaceholder, isPlaceholder} from "./entityService"
import { Player } from "./playerService"

export type RocketComponentName = keyof typeof rocketData

export interface Rocket extends OwnedEntity {
    components: RocketComponent[]

}

export interface RocketComponent extends OwnedEntity {
    name: RocketComponentName
}

//GETTERS
export function getComponentHeight(c: RocketComponent) : number {
    return rocketData[c.name].height
}

export function getRocketHeight(r: Rocket, excludedComponents?: Set<string>) {
    let height = 0;
    r.components.forEach((c, _) => {
        if (!getIsPlaceholder(c) && (!excludedComponents || !excludedComponents.has(c.id))) {
            height += getComponentHeight(c)
        }
    })
    return height
}

export function isEngine(c: RocketComponent) {
    return rocketData[c.name].isEngine
}

export function isControlModule(c: RocketComponent) {
    return rocketData[c.name].isControlModule
}

export function isNosecone(c: RocketComponent) {
    return rocketData[c.name].isNosecone
}

export function isFuelTank(c: RocketComponent) {
    return rocketData[c.name].isFuelTank
}

//CRUD
export function createRocket(player: Player, plot: number, isPlaceholder: boolean = false): {player: Player, rocket: Rocket} {
    const id = isPlaceholder ? `placeholder-${crypto.randomUUID()}` : crypto.randomUUID()
    const newRocket = {
        id: id,
        name: `rocket-${id}`,
        components: [],
        occupiedArea: plot
    }
    return {
        player: {
            ...player,
            rockets: [
                ...player.rockets.filter((r, _) => !getIsPlaceholder(r)),
                newRocket
            ]
        },
        rocket: newRocket
    }
}

export function deleteRocket(player: Player, id: string): {player: Player, rocket: Rocket} {
    const rocket = player.rockets.find((r, _) => r.id === id)!
    let worth = 0

    if(!isPlaceholder(rocket)) rocket.components.forEach((c, _) => worth += getPrice(c))

    return {
        player: {
            ...player,
            rockets: player.rockets.filter((r, _) => r.id !== id),
            netWorth: player.netWorth + worth
        },
        rocket: rocket
    }
}

export function createRocketComponent(player: Player, name: RocketComponentName, plot: number, isPlaceholder: boolean = false): {player: Player, rocketComponent: RocketComponent} {
    const id = isPlaceholder ? `placeholder-${crypto.randomUUID()}` : crypto.randomUUID()
    const newComponent = {
        name: name,
        id: id,
        occupiedArea: plot
    }
    const existingRocket = player.rockets.find((r, _) => r.occupiedArea == plot && !getIsPlaceholder(r))
    const {player:newPlayer, rocket} = existingRocket ? {player: player, rocket:existingRocket} : createRocket(player, plot, isPlaceholder)

    return {
        player: {
            ...newPlayer,
            netWorth: isPlaceholder ? player.netWorth : player.netWorth - getPrice(newComponent),
            rockets: newPlayer.rockets.map((r, _) => {
                if (r.id == rocket.id) {
                    return {
                        ...r,
                        components: [
                            ...r.components.filter((r, _) => !getIsPlaceholder(r)),
                            newComponent
                        ]
                    }
                } else {
                    return r
                }
            })
        },
        rocketComponent: newComponent
    }
}

export function deleteRocketComponent(player: Player, id: string) {
    let component;
    return {
        player: {
            ...player,
            rockets: player.rockets.map((r, _) => (
                {
                    ...r,
                    components: r.components.filter((c, _) => {
                        if (c.id === id) {
                            component = c
                            return false
                        }
                        return true
                    })
                    
                }
            )).filter((r, _) => !getIsPlaceholder(r) && r.components.length != 0),
            netWorth: getIsPlaceholder(component!) ? player.netWorth : player.netWorth + getPrice(component!),
        },
        rocketComponent: component
    }
}

//Component constraints
export function isValidPlacement(c:RocketComponent, r: Rocket, heightCap: number) {
    //filters placeholders from placement consideration
    const rocket = {
        ...r,
        components: r.components.filter((component, _) => !getIsPlaceholder(component))
    }

    //If the part has yet to be placed currIndex should be -1
    const currIndex = r.components.findIndex((component, _) => c.id == component.id)
    const partAbove = currIndex == -1 || currIndex + 1 > r.components.length ? null : r.components[currIndex + 1]
    const partBelow = currIndex == -1 ? (r.components.length != 0 ? r.components[r.components.length - 1] : null) : r.components[currIndex - 1]

    //Height Constraints
    let height = getComponentHeight(c)
    let currentHeight = getRocketHeight(rocket, new Set([c.id]))
    if (currentHeight + height > heightCap) return false
    
    if (isEngine(c) && !isEngineValid(partBelow)) return false
    if (isFuelTank(c) && !isFuelTankValid(partBelow)) return false
    if (isControlModule(c) && !isControlModuleValid(c, partBelow, rocket)) return false
    if (isNosecone(c) && !isNoseconeValid(partAbove, partBelow)) return false
 
    return true
}

export function isSellable(c: RocketComponent, r: Rocket) {
    const rocketWithoutPart = {
        ...r,
        components: r.components.filter((component, _) => component.id !== c.id)
    }  

    for (const component of rocketWithoutPart.components){
        //height cap does not matter because we are attempting to sell so the height will be decreased
        //and if the rocket already exists that means it fits within the confines
        //of whatever height constraints exists.
        if (!isValidPlacement(component, rocketWithoutPart, 1000000000)) return false
    }

    return true
}

//Engines must be the bottom most component
function isEngineValid(partBelow : RocketComponent | null) {
    return partBelow == null
}

//Fuel tanks can only be on top of other fuel tanks or an engine
function isFuelTankValid(partBelow: RocketComponent | null) :  boolean {
    if (!partBelow) return false
    if (!isEngine(partBelow) && !isFuelTank(partBelow)) return false
    return true
}

//Can only be one control module per rocket
function isControlModuleValid(c: RocketComponent, partBelow: RocketComponent | null, rocket: Rocket) : boolean {
    if (!partBelow) return false
    if (rocket.components.find((c2, _) => isControlModule(c2) && c.id !== c2.id)) return false
    return true
}

//Nosecones must be the top most component
//Nosecones must be built ontop of a control module
function isNoseconeValid(partAbove: RocketComponent | null, partBelow: RocketComponent | null) {
    if (partAbove) return false
    if (!partBelow) return false
    if (!isControlModule(partBelow)) return false
    return true
}