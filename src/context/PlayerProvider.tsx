import { createContext, useState } from "react";
import { Player } from "../services/playerService";
import { usePlayer } from "../hooks/usePlayer";
import { usePlayerPersistence } from "../hooks/usePlayerPersistence";

export const PlayerContext = createContext<[
    Player | null,
    React.Dispatch<React.SetStateAction<Player | null>> | null
]>([null, null])

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [player, setPlayer] = useState<Player | null>(null)
    usePlayerPersistence(player, setPlayer)

    return !player ? (
        <div />
    ) : (
        <PlayerContext value={[player, setPlayer]}>
            {children}
        </PlayerContext>
    )
}