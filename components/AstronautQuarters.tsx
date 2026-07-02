"use client"
import { useState, useEffect } from "react"
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
            <div className ="m-2 border-2 border-dashed border-blue-dark rounded relative z-20 flex-1 flex-col flex justify-between card-radial-gradient">
                <div className="z-20 texture opacity-5"/>
                <TopBar items={player.astronauts.length} itemCapacity={ROOM_SIZE}/>
                <div className="flex flex-col justify-end items-center h-full w-full">
                    <div className="flex items-end gap-6">
                    { player.astronauts.map((a, i) => (
                        <Astronaut key={i} astronautData={a} player={player} setPlayer={setPlayer}/>
                    ))}
                    </div>
                    <TiledSprite className = "w-full h-8 bg-blue-dark image-pixelated" tileUrl = "/sprites/floortile.png"/>
                </div>
              
            </div>
            
        </SectionCard>
    )
}