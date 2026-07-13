import Shop from "./Shop";
import Leaderboard from "./Leaderboard";
import Science from "./Science";
import Launchpad from "./Launchpad";
import AstronautQuarters from "./AstronautQuarters";
import { useState, createContext, Dispatch, SetStateAction } from "react";


export const PlayerContext = createContext(null)

export default function Game({ playerData }) {
    const [player, setPlayer] = useState(playerData);

    return (
        <div className="relative bg-radial-gradient w-screen h-screen flex flex-col items-center text-white font-jaro">

            <img className="h-screen opacity-10 w-screen object-cover absolute z-0" src="/imgs/blackhole.jpeg"></img>
            <div className="flex justify-center bg-blue-darker relative border-b-2 border-blue-dark border-dashed w-full h-8 z-30">
                <div className=" texture opacity-5" />
                <div className=" absolute top-0 right-0 pr-2 text-blue text-xs">
                    Developed by Nadden Auguste-Laventure
                </div>
                <div className="flex w-full items-center max-w-7xl px-12 gap-4 text-sm">
                   



                </div>

            </div>

            <PlayerContext value={[player, setPlayer]}>
                <div className="px-16 py-6 flex gap-8 h-full min-h-0 w-screen max-w-7xl relative z-20">
                    <div className=" basis-1/3 min-w-0 flex flex-col">
                        <div className="flex flex-col gap-4 pb-24">
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
                        <Launchpad className="grow relative w-full min-h-0" />
                    </div>

                    <div className="relative z-20 h-full basis-1/3 min-w-0 flex flex-col gap-8">
                        <Shop className="basis-1/2 w-full min-h-0" />
                        <AstronautQuarters className="relative z-20 basis-1/2 w-full min-h-0" />
                    </div>

                    <div className="relative z-10 h-full basis-1/3 min-w-0 flex flex-col gap-8">
                        <Science className="basis-1/2 w-full min-h-0" />
                        <Leaderboard className="basis-1/2 w-full min-h-0" />
                    </div>
                </div>
            </PlayerContext>
        </div>
    )
}