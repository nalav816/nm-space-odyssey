"use client"
import { PlayerContext } from "./Game"
import { useState, useEffect, useContext } from "react"
import SectionCard from "./SectionCard"
import TiledSprite from "./TiledSprite"
import TopBar from "./TopBar"
import { Astronaut } from "./Astronaut"
import ColoredSprite from "./ColoredSprite"
import TintedSprite from "./TintedSprite"
import type { Player } from "@/views/player"
import { usePlayer } from "@/hooks/usePlayer"

export default function EmployeesQuarters({ className }: { className?: string }) {
    const [player, setPlayer] = usePlayer();
    const ROOM_SIZE = 5
    const currRoom = 1
    const roomCount = 2

    return (
        <SectionCard iconUrl={"/sprites/astronautQuartersIcon.png"} className={"flex flex-col " + className} sectionName="Astronaut's Quarters">
            <div className="m-2 border-2 border-dashed border-blue-dark rounded relative z-20 flex-1 flex-col flex justify-between card-radial-gradient">
                <div className="z-20 texture opacity-5" />
                <TopBar items={player.astronauts.length} itemCapacity={ROOM_SIZE} />
                <div className="flex flex-col justify-end h-full w-full">
                    <div className="px-4 flex items-end justify-center w-full h-full">
                        {new Array(ROOM_SIZE).fill(0).map((_, i) => {
                            const astronaut = player.astronauts.find(a => a.occupiedSlot == i + 1)
                            return (
                                <div key={i} className="basis-1/5 h-full min-w-0 flex items-end justify-center">
                                    {astronaut ? (
                                        <Astronaut astronautData={astronaut} />
                                    ) : (
                                        <TintedSprite tintIntensity={1} spriteUrl="/sprites/scrub.png" className="text-blue-darker image-pixelated" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <TiledSprite className="w-full h-8 bg-blue-dark image-pixelated" tileUrl="/sprites/floortile.png" />
                </div>

            </div>

        </SectionCard>
    )
}