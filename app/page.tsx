import { getPlayerData } from "@/services/playerService";
import Game from "@/components/Game";

export default async function Home() {
  const username = "Nadden"
  const player = await getPlayerData(username)

  return <Game player={player}/>
}
