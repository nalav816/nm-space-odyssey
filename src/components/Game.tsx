import Shop from "./Shop";
import Leaderboard from "./Leaderboard";
import Science from "./Science";
import Launchpad from "./Launchpad";
import AstronautQuarters from "./AstronautQuarters";
import GameHub from "./GameHub";
import TitleBar from "./TitleBar"
import { User, Rocket, ShoppingCart, Atom, Podium } from "lucide-react";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { usePlayer } from "../hooks/usePlayer";
import { useArea } from "../hooks/useArea"

export default function Game() {
    const [player, _] = usePlayer()
    const [room, setRoom] = useArea('room')
    const [plot, setPlot] = useArea('plot')

    return (
        <div className="select-none relative bg-radial-gradient w-full h-screen flex flex-col items-center text-white font-jaro">
            <img className="h-full opacity-10 w-full object-cover absolute z-0" src="/imgs/blackhole.jpeg"></img>
            <TitleBar/>
                <div className="px-32 py-6 flex flex-1 justify-center min-h-0 w-full gap-8 relative z-20 overflow-auto scrollbar-custom ">
                    <div className="w-80 min-h-180 h-full flex flex-col">
                        <div className="flex flex-col gap-2 pb-24">
                            <div className="text-5xl title-glow">
                                <span className="text-2xl text-blue-light"> n&m </span>
                                Space <br /> <span className="text-blue-lightest"> Odyssey </span> </div>
                            <div>
                                <span className="text-blue-lightest"> {player.username}'s </span>Space Station
                            </div>
                            <div className="flex gap-4 items-center">
                                <img className="h-8 w-8 image-pixelated image-glow-green" src="/sprites/cash.png" />
                                <div className=" text-green-light text-glow-green text-lg"> ${player.netWorth} </div>
                            </div>
                            

                        </div>
                        <Launchpad plot={plot} setPlot={setPlot} className="grow relative w-full min-h-0" />
                    </div>

                    <div className="relative z-20 min-h-180 h-full w-80 flex flex-col gap-8">
                        <Shop 
                            className="hidden xl:flex basis-1/2 w-full min-h-0" 
                            plot = {plot}
                            setPlot = {setPlot}
                        />
                        <GameHub className="flex xl:hidden relative basis-1/2 w-full min-h-0" plot={plot} setPlot={setPlot}/>
                        <AstronautQuarters room={room} setRoom={setRoom} className="relative z-20 basis-1/2 w-full min-h-0" />
                    </div>

                    <div className="hidden xl:flex relative z-10 min-h-180 h-full w-80 flex-col gap-8">
                        <Science className="basis-1/2 w-full min-h-0" />
                        <Leaderboard className="basis-1/2 w-full min-h-0" />
                    </div>
                </div> 
           
        </div>
    )
}