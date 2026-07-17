import { createContext, useEffect, useState } from "react";
import { Player } from "../services/playerService";
import { usePlayer } from "../hooks/usePlayer";
import { usePlayerPersistence } from "../hooks/usePlayerPersistence";
import { usePlayerTick } from "../hooks/usePlayerTick";
import playerData from "../data/player.json"

export const PlayerContext = createContext<[
    Player,
    React.Dispatch<React.SetStateAction<Player>> 
]  | null>(null)

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [player, setPlayer] = useState<Player>(playerData.DEFAULT_PLAYER_DATA)
    usePlayerPersistence(player, setPlayer)
    usePlayerTick(setPlayer)

    return !player ? (
        <div />
    ) : (
        <PlayerContext value={[player, setPlayer]}>
            {children}
        </PlayerContext>
    )
}