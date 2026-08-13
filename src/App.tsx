import Game from "./components/Game"
import GameProvider from "./context/GameProvider"
import PlayerProvider from "./context/PlayerProvider"
import { Toaster } from "sonner"

export default function App() {
  return (
    <GameProvider>
      <PlayerProvider>
        <Game />
        <Toaster position="bottom-right"/>
      </PlayerProvider>
    </GameProvider>
  )
}
