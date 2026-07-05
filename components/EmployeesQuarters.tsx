"use client"
import SectionCard from "./SectionCard"
import TiledSprite from "./TiledSprite"
import TopBar from "./TopBar"
import { Astronaut } from "./Astronaut"
import TintedSprite from "./TintedSprite"
import type { Player } from "@/views/player"
import { usePlayer } from "@/hooks/usePlayer"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"

export function getNextAvailableQuartersSlot(player: Player) {
    let slot = 1
    let room = 1

    player.astronauts.sort((a: any, b: any) => {
        if (a.occupiedRoom != b.occupiedRoom) {
            return a.occupiedRoom - b.occupiedRoom
        }

        return a.occupiedSlot - b.occupiedSlot
    })

    for (const a of player.astronauts) {
        if (a.occupiedSlot == slot && a.occupiedRoom == room) {
            slot += 1
            if (slot > player.roomSpaceCap) {
                slot = 1
                room += 1
            }
        } else {
            break
        }
    }

    return {
        room,
        slot
    }
}

export default function EmployeesQuarters({ className }: { className?: string }) {
    const [player, setPlayer] = usePlayer();
    const [room, setRoom] = useState(1);

    const handleArrowClicked = (isRightArrow: boolean) => {
        if (isRightArrow) {
            setRoom(prev => prev + 1)
        } else {
            setRoom(prev => prev - 1)
        }
    }

    function getCountInCurrentRoom () {
        let count = 0
        for (const a of player.astronauts) {
            if (a.occupiedRoom == room) count += 1
        }
        return count
    }

    return (
        <SectionCard iconUrl={"/sprites/astronautQuartersIcon.png"} className={"flex flex-col " + className} sectionName="Astronaut's Quarters">
            <div className="m-2 border-2 border-dashed border-blue-dark rounded relative z-20 flex-1 flex-col flex justify-between card-radial-gradient">
                <div className="z-20 texture opacity-5" />
                <TopBar
                    items={getCountInCurrentRoom()}
                    itemCapacity={player.roomSpaceCap}
                    currRoom={room}
                    roomCount={player.astronautRoomCount}
                    setRoom={setRoom}
                />
                <div className="flex flex-col flex-1 justify-end w-full overflow-hidden ">
                    <motion.div 
                        className="flex"
                        animate = {{
                            x: (-100 * (room - 1)) + "%"
                        }}
                        transition = {{
                            duration: .3,
                            ease: "easeInOut"
                        }}
                    >
                    {new Array(player.astronautRoomCount).fill(0).map((_, i) => (
                        <div key={i} className="flex min-w-full">
                                {new Array(player.roomSpaceCap).fill(0).map((_, j) => {
                                    const astronaut = player.astronauts.find(a => a.occupiedRoom == i + 1 && a.occupiedSlot == j + 1)
                                    return (
                                        <div key={j} className={`relative basis-1/5 h-full min-w-0 flex items-end justify-center`}>
                                            {astronaut ? (
                                                <Astronaut astronautData={astronaut} />
                                            ) : (
                                                <TintedSprite tintIntensity={1} spriteUrl="/sprites/scrub.png" className="relative z-10 text-blue-darker image-pixelated" />
                                            )}
                                        </div>
                                    )
                                })}
                        </div>
                    ))}
                    </motion.div>

                    <TiledSprite className="w-full h-8 bg-blue-dark image-pixelated" tileUrl="/sprites/floortile.png" />
                    <div className="w-full px-4 pb-2 flex justify-between">
                        <button
                            onClick={() => handleArrowClicked(false)}
                            disabled={room <= 1}
                            className="disabled:opacity-0 disabled:pointer-events-none"
                        >
                            <ArrowLeft className="transition-transform duration-200 hover:-translate-y-1 hover:text-blue-lightest text-blue-light h-6 w-6" />
                        </button>
                        <button
                            onClick={() => handleArrowClicked(true)}
                            disabled={room >= player.astronautRoomCount}
                            className="disabled:opacity-0 disabled:pointer-events-none"
                        >
                            <ArrowRight className="transition-transform duration-200 hover:-translate-y-1 hover:text-blue-lightest text-blue-light h-6 w-6" />
                        </button>
                    </div>
                </div>

            </div>

        </SectionCard>
    )
}