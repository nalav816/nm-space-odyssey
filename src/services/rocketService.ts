import rocketData from "../data/rocketry.json"

export type Component = keyof typeof rocketData

export interface Rocket {
    id: string
    occupiedPlot: number
    components: RocketComponent[]

}

export interface RocketComponent {
    name: Component


}

export function getModel (component:RocketComponent) {
    return rocketData[component.name].modelUrl
}