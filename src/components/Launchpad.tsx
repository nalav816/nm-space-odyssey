import SectionCard from "./SectionCard"
import TiledSprite from "./TiledSprite"
import TintedSprite from "./TintedSprite"
import ColoredSprite from "./ColoredSprite"
import { useState, useEffect } from "react"
import { usePlayer } from "../hooks/usePlayer"
import Rocket from "./Rocket"
import AreaMenu from "./AreaMenu"
import { Rocket as RocketIcon} from "lucide-react"
import { Rocket as RocketType, getRocketHeight } from "../services/rocketService"
import { motion } from "motion/react"

const RocketPlatform = ({ rocket }: { rocket: RocketType | null }) => {
    return (
        <div className="relative flex flex-col items-end">
            {rocket && (<Rocket rocket={rocket} />)}
            <ColoredSprite color="blue-dark" spriteUrl="/sprites/launchpad.png" />
        </div>
    )
}

export default function Launchpad({ className, plot, setPlot }: { className: string, plot: number, setPlot: React.Dispatch<React.SetStateAction<number>> }) {
    const [player, setPlayer] = usePlayer()
    const currRocket = player.rockets.find((r, _) => r.occupiedArea == plot)

    return (
        <SectionCard icon={RocketIcon} className={"flex flex-col " + className} sectionName="Launchpad">
            <div className="relative z-20 rounded-b flex-1 min-h-0 flex-col flex justify-between card-radial-gradient">
                <div className="texture opacity-5" />
                <AreaMenu
                    areaCount={player.rocketPlotCount}
                    itemCapacity={player.plotHeightCap}
                    items={currRocket ? getRocketHeight(currRocket) : 0}
                    setArea={setPlot}
                    currArea={plot}
                    isLaunchpad={true}
                />
                <div className="flex-1 min-h-0 h-full w-full flex flex-col items-center justify-end overflow-hidden">
                    <motion.div 
                        className="w-full flex h-full"
                        animate={{
                            x: (-100 * (plot - 1)) + "%"
                        }}
                        transition={{
                            duration: .3,
                            ease: "easeInOut"
                        }}
                    >
                        {new Array(player.rocketPlotCount).fill(0).map((_, i) => (
                            <div className="min-w-full h-full flex flex-col justify-end" key={i}>
                                <div className="flex-1 w-full min-h-0 px-4">
                                    <div className="h-full flex min-h-0 flex-col-reverse overflow-auto w-full scrollbar-custom ">
                                        <div className="flex justify-between items-end">
                                            <ColoredSprite color="blue-dark" spriteUrl="/sprites/controlTower.png" />
                                            <RocketPlatform rocket={player.rockets[i]} />
                                        </div>


                                    </div>
                                </div>
                                <TiledSprite tileUrl={"/sprites/grassTile.png"} color="blue-dark" className="w-full! image-pixelated"></TiledSprite>
                            </div>
                        ))}


                    </motion.div>
                </div>

            </div>

        </SectionCard>
    )
}