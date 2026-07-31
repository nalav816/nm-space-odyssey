import rocketData from "../data/rocketry.json"
import {  OwnedEntity, getPrice, isPlaceholder as getIsPlaceholder} from "./entityService"
import { Player } from "./playerService"

export type RocketComponentName = keyof typeof rocketData

export interface Rocket extends OwnedEntity {
    components: RocketComponent[]

}

export interface RocketComponent extends OwnedEntity {
    name: RocketComponentName
}

//GETTERS
export function isEngine(r: RocketComponent) {
    return rocketData[r.name].isEngine
}

export function isCommandModule(r: RocketComponent) {
    return rocketData[r.name].isCommandModule
}

export function isNosecone(r: RocketComponent) {
    return rocketData[r.name].isNosecone
}

export function isFuelTank(r: RocketComponent) {
    return rocketData[r.name].isFuelTank
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
    return {
        player: {
            ...player,
            rockets: player.rockets.filter((r, _) => r.id !== id)
        },
        rocket: player.rockets.find((r, _) => r.id === id)!
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
export function isPlaceable(c:RocketComponent, r: Rocket) {
    /*
    GENERAL CONSTRAINTS
    * nothing can be built if there is no engine (aside from an engine)
    * nothing can be placed ontop of a nosecone
    * nothing can go ontop of a command module but nosecone

    */
    const componentsWithoutPlaceholders = r.components.filter((c, _) => !getIsPlaceholder(c))
    const componentCount = componentsWithoutPlaceholders.length
    const topComponent = componentCount > 0 ? componentsWithoutPlaceholders[componentCount - 1] : null

    if (!topComponent) {
        if (!isEngine(c)) {
            return false
        } else {
            return true
        }
    }
    
    //top component must now exist at this point
    if (isNosecone(topComponent)) return false
    if (isCommandModule(topComponent) && !isNosecone(c)) return false

    //Specific constraints
    //Engines cannot be placed ontop of things
    if (isEngine(c)) return false
    if (isFuelTank(c) && !isFuelTankPlaceable(topComponent)) return false
 
    return true
}

export function isSellable(c: RocketComponent, r: Rocket) {

}


/*
FUEL TANK RULES
* Must be built ontop of another fuel tank or engine
*/
function isFuelTankPlaceable(topComponent: RocketComponent) :  boolean {
    if (!isEngine(topComponent) && !isFuelTank(topComponent)) return false
    return true
}