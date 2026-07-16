import Game from "./components/Game"
import PlayerProvider from "./context/PlayerProvider"

export default function App() {
  return (
    <PlayerProvider>
      <Game />
    </PlayerProvider>
  )
}
