import { PlayerContext } from "../App";
import { useContext } from "react";

export function usePlayer() {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Context is null");
    }

    return context;
}