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
        <div className="relative bg-radial-gradient w-screen h-screen flex justify-center relative text-white font-jaro">
            <div className= "texture opacity-2 z-10"/>
            <img className="h-screen opacity-10 w-screen blur-[1px] object-cover absolute z-0" src="/imgs/space.jpeg"></img>
            <div className="px-12 py-8 flex gap-8 h-screen w-screen max-w-7xl absolute z-20">
                <div className="h-full basis-1/3 flex flex-col">
                    <div className="flex flex-col gap-4 pb-24">
                        <div className="text-5xl title-glow">
                            <span className="text-2xl text-blue-light"> n&m </span>
                            Space <br /> <span className="text-blue-lightest"> Odyssey </span> </div>
                        <div className="text-blue-lightest text-lg"> {player.username}'s Space Station </div>
                        <div className="flex gap-4 items-center">
                            <img className="h-8 w-8 image-pixelated image-glow-green" src="/sprites/cash.png" />
                            <div className=" text-green-light text-glow-green text-lg"> ${player.netWorth} </div>
                        </div>

                    </div>
                    <Shop player={player} setPlayer={setPlayer} className="min-w-80 grow w-full" />
                </div>

                <div className="h-full basis-1/3 flex flex-col gap-8">
                    <EmployeesQuarters setPlayer={setPlayer} player={player} className="min-w-80 basis-1/2 w-full" />
                    <Launchpad className="min-w-80 basis-1/2 w-full" />
                </div>

                <div className="h-full basis-1/3 flex flex-col gap-8">
                    <Science className="min-w-80 basis-1/2 w-full" />
                    <Leaderboard className="min-w-80 basis-1/2 w-full" />
                </div>
            </div>
        </div>
    )
}