import { PlayerContext } from "../context/PlayerProvider";
import { useContext } from "react";

export function usePlayer() {
   const context = useContext(PlayerContext)!
   



    return context; 
}