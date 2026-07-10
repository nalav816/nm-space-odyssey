import { PlayerContext } from "../components/Game";
import { useContext } from "react";

export function usePlayer() {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Context is null");
    }

    return context;
}