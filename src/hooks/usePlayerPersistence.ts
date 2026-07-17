import { useEffect } from "react";
import { Player } from "../services/playerService";
import { loadPlayerData } from "../services/playerService";

export function usePlayerPersistence(player:Player | null,  setPlayer: React.Dispatch<React.SetStateAction<Player>>) {
    //initial load
    useEffect(() => {
        async function loadPlayer() {
            try {
                const data = await loadPlayerData();
                setPlayer(data)
            } catch {

            }
        }

        loadPlayer()
    }, [])

    //save on app close
    useEffect(() => {
        const removeListener = window.appEvents.onAppClose(() => {
            if (player) window.data.savePlayerData(player, true)
        })

        return removeListener
    }, [player])
}