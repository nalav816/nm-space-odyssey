import Game from "./components/Game"

export default function App() {
  const player = {
    username: 'nadden',
    netWorth: 300,
    astronauts: [],
    astronautRoomCount: 2,
    roomSpaceCap: 5,
    rocketPlotCount:1,
    plotSpaceCap: 1,
    shop: {
      "Astronauts": [],
      "Rockets": []
    }
  }

  return <Game playerData={player}/>
}
