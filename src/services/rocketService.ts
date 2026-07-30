import rocketData from "../data/rocketry.json"
import {  EntityName, OwnedEntity } from "./entityService"
import { Player } from "./playerService"

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
                ...player.rockets,
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

export function createRocketComponent(player: Player, name: RocketComponentName, rocket: Rocket, isPlaceholder: boolean = false): {player: Player, rocketComponent: RocketComponent} {
    const id = isPlaceholder ? `placeholder-${crypto.randomUUID()}` : crypto.randomUUID()
    const newComponent = {
        name: name,
        id: id,
        occupiedArea: rocket.occupiedArea
    }
    return {
        player: {
            ...player,
            rockets: player.rockets.map((r, _) => {
                if (r.id == rocket.id) {
                    return {
                        ...r,
                        components: [
                            ...r.components,
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
            ))
        },
        rocketComponent: component
    }
}