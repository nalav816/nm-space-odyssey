import rocketData from "../data/rocketry.json"
import { OwnedEntity, getPrice, isPlaceholder as getIsPlaceholder, isPlaceholder } from "./entityService"
import { Player } from "./playerService"

export type RocketComponentName = keyof typeof rocketData

export interface Rocket extends OwnedEntity {
    components: RocketComponent[]

}

export interface RocketComponent extends OwnedEntity {
    name: RocketComponentName
}

//GETTERS
export function getComponentHeight(c: RocketComponent): number {
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
export function createRocket(player: Player, plot: number, isPlaceholder: boolean = false): { player: Player, rocket: Rocket } {
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

export function deleteRocket(player: Player, id: string): { player: Player, rocket: Rocket } {
    const rocket = player.rockets.find((r, _) => r.id === id)!
    let worth = 0

    if (!isPlaceholder(rocket)) rocket.components.forEach((c, _) => worth += getPrice(c))

    return {
        player: {
            ...player,
            rockets: player.rockets.filter((r, _) => r.id !== id),
            netWorth: player.netWorth + worth
        },
        rocket: rocket
    }
}

export function createRocketComponent(player: Player, name: RocketComponentName, plot: number, isPlaceholder: boolean = false): { player: Player, rocketComponent: RocketComponent } {
    const id = isPlaceholder ? `placeholder-${crypto.randomUUID()}` : crypto.randomUUID()
    const newComponent = {
        name: name,
        id: id,
        occupiedArea: plot
    }
    const existingRocket = player.rockets.find((r, _) => r.occupiedArea == plot && !getIsPlaceholder(r))
    const { player: newPlayer, rocket } = existingRocket ? { player: player, rocket: existingRocket } : createRocket(player, plot, isPlaceholder)

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

export type ValidationResult = {
    isValid: boolean,
    errorMessage?: string
}

//Component constraints
export function validatePlacement(c: RocketComponent, r: Rocket, heightCap: number): ValidationResult {
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
    if (currentHeight + height > heightCap) {
        return {
            isValid: false,
            errorMessage: "Rocket height limit can not be exceeded."
        }
    }

    if (isEngine(c)) {
        const res = validateEngine(partBelow)
        if (!res.isValid) return res
    } else {
        if (!partBelow) {
            return {
                isValid: false,
                errorMessage: "All rocket parts must be placed ontop of an engine."
            }
        }
    }

    if (isFuelTank(c)) {
        const res = validateFuelTank(partBelow!)
        if (!res.isValid) return res
    }

    if (isControlModule(c)) {
        const res = validateControlModule(c, partBelow!, rocket)
        if (!res.isValid) return res
    }

    if (isNosecone(c)) {
        const res = validateNosecone(partAbove, partBelow!)
        if (!res.isValid) return res
    }

    return {
        isValid: true
    }
}

export function validateSale(c: RocketComponent, r: Rocket) : ValidationResult{
    const rocketWithoutPart = {
        ...r,
        components: r.components.filter((component, _) => component.id !== c.id)
    }

    let result : ValidationResult = {
        isValid: true
    }

    for (const component of rocketWithoutPart.components) {
        //height cap does not matter because we are attempting to sell so the height will be decreased
        //and if the rocket already exists that means it fits within the confines
        //of whatever height constraints exists.
        const res = validatePlacement(component, rocketWithoutPart, 100000000)
        if (!res.isValid) {
            result.isValid = false
            if (result.errorMessage) {
                result.errorMessage += "• " + res.errorMessage
            } else {
                result.errorMessage = "The following constraints are violated without the part that was attempted to be sold: \n" + "• " + res.errorMessage
            }
        }
    }

    return result
}

//Engines must be the bottom most component
function validateEngine(partBelow: RocketComponent | null): ValidationResult {
    if (!partBelow) {
        return {
            isValid: true
        }
    } else {
        return {
            isValid: false,
            errorMessage: "Engines must be built at the bottom of a rocket."
        }
    }
}

//Fuel tanks can only be on top of other fuel tanks or an engine
function validateFuelTank(partBelow: RocketComponent): ValidationResult {
    if (!isEngine(partBelow) && !isFuelTank(partBelow)) {
        return {
            isValid: false,
            errorMessage: "Fuel tanks must be built on top of other fuel tanks or an engine."
        }
    }
    return {isValid: true}
}

//Can only be one control module per rocket
function validateControlModule(c: RocketComponent, partBelow: RocketComponent, rocket: Rocket): ValidationResult {
    if (rocket.components.find((c2, _) => isControlModule(c2) && c.id !== c2.id)) {
        return {
            isValid: false,
            errorMessage: "Only one control module may exist per rocket."
        }
    }
    return {isValid: true}
}

//Nosecones must be the top most component
//Nosecones must be built ontop of a control module
function validateNosecone(partAbove: RocketComponent | null, partBelow: RocketComponent): ValidationResult {
    if (partAbove) {
        return {
            isValid: false,
            errorMessage: "Nosecones must be built at the top of a rocket."
        }
    }
    if (!isControlModule(partBelow)) {
        return {
            isValid: false,
            errorMessage: "Nosecones can only be built on top of a control module."
        }
    }
    return {isValid: true}
}