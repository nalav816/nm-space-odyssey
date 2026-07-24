import TintedSprite from "./TintedSprite"
import { Rocket as RocketType, RocketComponent as RocketComponentType, getModel } from "../services/rocketService"
import { useState } from "react"

const RocketComponent = ({ component }: { component: RocketComponentType }) => {
    return (
        <TintedSprite tintIntensity={0} spriteUrl={getModel(component)} />
    )
}

export default function Rocket({ rocket } : {rocket:RocketType}) {
   
    return (
        <div className="flex flex-col-reverse absolute bottom-8 left-8">
            {rocket.components.map((c, i) => {
                return (
                    <div key={i} className="flex flex-col">
                        {i < rocket.components.length - 1 && (
                            <TintedSprite tintIntensity={0} spriteUrl="/sprites/coupler.png"/>
                        )}
                        <RocketComponent component={c} />
                    </div>      
                )
            })}
        </div>
    )
}