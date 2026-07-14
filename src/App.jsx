import Game from "./components/Game"
import { loadPlayerData } from "./services/playerService";
import { useState, useEffect, createContext } from "react"

export const PlayerContext = createContext()

export default function App() {
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlayer() {
      try {
        const data = await loadPlayerData();
        setPlayer(data)
        setIsLoading(false)
      } catch {

      }
    }

    loadPlayer()
  }, [])

  return player ? (
    <PlayerContext value={[player, setPlayer]}>
      <Game player={player} setPlayer={setPlayer} />
    </PlayerContext>
    
  ) : <div />
}
