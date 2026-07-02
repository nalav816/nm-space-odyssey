"use client"
import Shop from "../components/Shop";
import Leaderboard from "../components/Leaderboard";
import Science from "@/components/Science";
import Launchpad from "@/components/Launchpad";
import EmployeesQuarters from "@/components/AstronautQuarters";
import { useState } from "react";
import { Player } from "@/views/player";

export default function Game({ playerData }: { playerData:Player }) {
    const [player, setPlayer] = useState<Player>(playerData);
    
    return (
        <div className="relative bg-radial-gradient w-screen h-screen flex flex-col items-center text-white font-jaro">
           
            <img className="h-screen opacity-10 w-screen blur-xs object-cover absolute z-0" src="/imgs/space.jpeg"></img>
            <div className="flex justify-center bg-blue-dark relative border-b-2 border-blue-darker border-dashed w-full h-8 z-30">
                <div className=" texture opacity-5"/>
                <div className=" absolute top-0 right-0 pr-2 text-blue text-xs">
                     Developed by Nadden Auguste-Laventure
                </div>
                <div className="flex w-full items-center max-w-7xl px-12 gap-4 text-sm">
                    <div>
                        <span className="text-blue-lightest"> {player.username}'s </span>Space Station
                    </div>
                    <button className="rounded border-[1px] border-dashed border-blue bg-blue-light text-xs h-5 w-24">
                        Sign out
                    </button>
                    
                  
                </div>
                
            </div>
            <div className="px-12 py-8 flex gap-8 h-full min-h-0 w-screen max-w-7xl relative z-20">
                <div className=" basis-1/3 min-w-0 flex flex-col">
                    <div className="flex flex-col gap-4 pb-24">
                        <div className="text-5xl title-glow">
                            <span className="text-2xl text-blue-light"> n&m </span>
                            Space <br /> <span className="text-blue-lightest"> Odyssey </span> </div>
                        <div className="flex gap-4 items-center">
                            <img className="h-8 w-8 image-pixelated image-glow-green" src="/sprites/cash.png" />
                            <div className=" text-green-light text-glow-green text-lg"> ${player.netWorth} </div>
                        </div>

                    </div>
                    <Shop player={player} setPlayer={setPlayer} className="grow w-full" />
                </div>

                <div className="relative z-20 h-full basis-1/3 min-w-0 flex flex-col gap-8">
                    <EmployeesQuarters setPlayer={setPlayer} player={player} className="relative z-20 basis-1/2 w-full min-h-0" />
                    <Launchpad className="relative z-10 basis-1/2 w-full min-h-0" />
                </div>

                <div className="relative z-10 h-full basis-1/3 min-w-0 flex flex-col gap-8">
                    <Science player={player} className="basis-1/2 w-full min-h-0" />
                    <Leaderboard className="basis-1/2 w-full min-h-0" />
                </div>
            </div>
        </div>
    )
}