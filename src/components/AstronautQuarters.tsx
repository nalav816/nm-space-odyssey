import SectionCard from "./SectionCard"
import TiledSprite from "./TiledSprite"
import TopBar from "./AreaMenu"
import Astronaut from "./Astronaut"
import type { Astronaut as AstronautType } from "../services/astronautService"
import type { Player } from "../services/playerService"
import TintedSprite from "./TintedSprite"
import { usePlayer } from "../hooks/usePlayer"
import { useEffect, useState, useRef } from "react"
import { User } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import ColoredSprite from "./ColoredSprite"
import AreaMenu from "./AreaMenu"

export default function AstronautQuarters({ className, room, setRoom }: { className: string, room: number, setRoom: React.Dispatch<React.SetStateAction<number>> }) {
    const [player, setPlayer] = usePlayer();

    const handleArrowClicked = (isRightArrow: boolean) => {
        if (isRightArrow) {
            setRoom((prev: number) => prev + 1)
        } else {
            setRoom((prev: number) => prev - 1)
        }
    }

    return (
        <SectionCard icon={User} className={"flex flex-col " + className} sectionName="Astronaut's Quarters">
            <div className="rounded-b relative z-20 flex-1 flex-col flex justify-between card-radial-gradient">
                <div className="z-20 texture opacity-5" />
                <AreaMenu
                    items={player.astronauts.filter((a, _) => a.occupiedArea == room).length}
                    itemCapacity={player.roomSpaceCap}
                    currArea={room}
                    areaCount={player.astronautRoomCount}
                    setArea={setRoom}
                    isLaunchpad={false}
                />
                <div className="flex flex-col flex-1 justify-end w-full overflow-hidden ">
                    <motion.div
                        className="flex"
                        animate={{
                            x: (-100 * (room - 1)) + "%"
                        }}
                        transition={{
                            duration: .3,
                            ease: "easeInOut"
                        }}
                    >
                        {new Array(player.astronautRoomCount).fill(0).map((_, i) => (
                            <div key={i} className="min-w-full flex flex-col justify-end">
                                <div className="flex items-end min-w-full">
                                    {new Array(player.roomSpaceCap).fill(0).map((_, j) => {
                                        const astronaut = player.astronauts.find((a: AstronautType) => a.occupiedArea == i + 1 && a.occupiedSlot == j + 1)
                                        return (
                                            <div key={j} className={`relative basis-1/5 h-full min-w-0 flex items-end justify-center`}>
                                                {astronaut ? (
                                                    <Astronaut astronaut={astronaut} />
                                                ) : (
                                                    <ColoredSprite spriteUrl="/sprites/scrub.png" color="blue-darker" className="relative z-10" />
                                                )}

                                            </div>
                                        )
                                    })}
                                </div>
                                <TiledSprite className="w-full! bg-blue-dark image-pixelated" color="blue-dark" tileUrl="/sprites/floorTile.png" />
                            </div>

                        ))}
                    </motion.div>
                </div>
            </div>

        </SectionCard>
    )
}