"use client"
import { useState } from "react"
import SectionCard from "./SectionCard"
import TiledSprite  from "./TiledSprite"
import TopBar from "./TopBar"
import { Astronaut } from "./Astronaut"
import ColoredSprite from "./ColoredSprite"
import TintedSprite from "./TintedSprite"
import type { Player } from "@/views/player"

export default function EmployeesQuarters({player, setPlayer, className} : {player: Player, setPlayer:React.Dispatch<React.SetStateAction<Player>>, className?: string}){
    const ROOM_SIZE = 5
    const currRoom = 1
    const roomCount = 2

    return (
        <SectionCard iconUrl={"/sprites/astronautQuartersIcon.png"} className = {"flex flex-col " + className} sectionName = "Astronaut's Quarters">
            <div className ="flex-1 flex-col flex justify-between">
                <TopBar items={player.astronauts.length} itemCapacity={ROOM_SIZE}/>
                <div className = "h-24 w-full flex flex-col items-center">
                    <div className="flex w-80 h-16">
                        {player.astronauts.map((employee: any, i: number) => (
                            <div className="w-16 h-16 flex items-end justify-center" key={i} >
                                <Astronaut astronautData={employee} player={player} setPlayer={setPlayer}/>
                            </div>
                            
                        ))}
                        {new Array(ROOM_SIZE - player.astronauts.length).fill(0).map((_, i) => (
                            <div className="w-16 h-16 flex items-end justify-center" key={i} >
                                <TintedSprite className="text-blue-darkest image-pixelated" spriteUrl="/sprites/scrub.png" tintIntensity={1}/>
                            </div>
                        ))}
                    </div>
                    <TiledSprite tileUrl={"/sprites/floorTile.png"} className="bg-blue-darker w-full h-8 image-pixelated"></TiledSprite>
                </div>
                
            </div>
            
        </SectionCard>
    )
}