import SectionCard from "./SectionCard"
import TiledSprite from "./TiledSprite"
import TintedSprite from "./TintedSprite"
import ColoredSprite from "./ColoredSprite"
import { useState, useEffect } from "react"
import { usePlayer } from "../hooks/usePlayer"
import Rocket from "./Rocket"
import AreaMenu from "./AreaMenu"
import { Rocket as RocketType } from "../services/rocketService"

const RocketPlatform = ({ rocket } : {rocket:RocketType | null}) => {
    return (
        <div className="relative flex flex-col items-end">
           {rocket && (<Rocket rocket={rocket}/>)}
           <ColoredSprite spriteUrl="/sprites/launchpad.png"/>
        </div>
    )
}

export default function Launchpad({ className, plot, setPlot } : { className: string, plot: number, setPlot: React.Dispatch<React.SetStateAction<number>>}) {
    const [player, setPlayer] = usePlayer()

    return (
        <SectionCard iconUrl={"/sprites/launchpadIcon.png"} className={"flex flex-col " + className} sectionName="Launchpad">
            <div className="relative z-20 rounded-b flex-1 min-h-0 flex-col flex justify-between card-radial-gradient">
                <div className="texture opacity-5"/>
                <AreaMenu
                    areaCount={player.rocketPlotCount}
                    itemCapacity={player.plotHeightCap}
                    items={player.rockets.filter((r, _) => r.occupiedArea == plot).length}
                    setArea={setPlot}
                    currArea={plot}
                    isLaunchpad={true} 
                />
                <div className="flex-1 min-h-0 w-full flex flex-col items-center">
                    <div className="flex-1 w-full min-h-0 px-4">
                        <div className="h-full flex min-h-0 flex-col-reverse overflow-auto w-full scrollbar-custom ">
                            <div className="flex justify-between items-end">
                                <ColoredSprite spriteUrl="/sprites/controlTower.png"/>
                                <ColoredSprite spriteUrl="/sprites/gasStation.png"/>
                                <RocketPlatform rocket={player.rockets.length > 0 ? player.rockets[0] : null} />
                            </div>
                            

                        </div>
                    </div>

                    <TiledSprite tileUrl={"/sprites/grassTile.png"} color="blue-dark" className="w-full! image-pixelated mb-2"></TiledSprite>
                </div>

            </div>

        </SectionCard>
    )
}