import rocketData from "../data/rocketry.json"

export type RocketComponentName = keyof typeof rocketData

export interface Rocket {
    id: string
    occupiedPlot: number
    components: RocketComponent[]

}

export interface RocketComponent {
    name: RocketComponentName


}

export function getModel (component:RocketComponent) {
    return rocketData[component.name].modelUrl
}

export function getShopIcon (componentName: RocketComponentName){
    return rocketData[componentName].shopIconUrl
}