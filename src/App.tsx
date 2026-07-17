import Game from "./components/Game"
import GameProvider from "./context/GameProvider"
import PlayerProvider from "./context/PlayerProvider"

export default function App() {
  return (
    <GameProvider>
      <PlayerProvider>
        <Game />
      </PlayerProvider>
    </GameProvider>
  )
}
