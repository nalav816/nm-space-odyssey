import Shop from "./Shop";
import Leaderboard from "./Leaderboard";
import Science from "./Science";
import Launchpad from "./Launchpad";
import AstronautQuarters from "./AstronautQuarters";
import TitleBar from "./TitleBar"
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { usePlayer } from "../hooks/usePlayer";
import { useArea } from "../hooks/useArea"

export default function Game() {
    const [player, _] = usePlayer()
    const [room, setRoom] = useArea('room')
    const [plot, setPlot] = useArea('plot')

    return (
        <div className="select-none relative bg-radial-gradient w-full h-screen min-h-180 min-w-7xl flex flex-col items-center text-white font-jaro">
            <img className="h-full opacity-10 w-full object-cover absolute z-0" src="/imgs/blackhole.jpeg"></img>
            <div className="texture opacity-3"/>
            <TitleBar/>
     
                <div className="px-32 py-6 flex flex-1 min-h-0 w-full gap-8 max-w-7xl relative z-20">
                    <div className="w-80 min-w-0 flex flex-col">
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

                    <div className="relative z-20 h-full w-80 min-w-0 flex flex-col gap-8">
                        <Shop 
                            className="basis-1/2 w-full min-h-0" 
                            plot = {plot}
                            setPlot = {setPlot}
                        />
                        <AstronautQuarters room={room} setRoom={setRoom} className="relative z-20 basis-1/2 w-full min-h-0" />
                    </div>

                    <div className="relative z-10 h-full w-80 min-w-0 flex flex-col gap-8">
                        <Science className="basis-1/2 w-full min-h-0" />
                        <Leaderboard className="basis-1/2 w-full min-h-0" />
                    </div>
                </div> 
           
        </div>
    )
}