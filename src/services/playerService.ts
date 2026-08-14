
import type { Shop } from "./shopService"
import { getIdleIncomes, updateCurencyTimestamps } from "../services/astronautService";
import { Rocket } from "./rocketService";
import { isPlaceholder } from "./entityService";

export interface Player {
  username: string,
  netWorth: number,
  astronauts: any[],
  rockets: Rocket[],
  astronautRoomCount: number,
  roomSpaceCap: number,
  rocketPlotCount: number,
  plotHeightCap: number,
  shop: Shop
}

export async function savePlayerData(player: Player) {
  try {
    //Dont save any placeholder data
    const playerToSave = {
      ...player,
      astronauts: player.astronauts.filter((a, _) => !isPlaceholder(a)),
      rockets: player.rockets.filter((r, _) => !isPlaceholder(r)).map((r, _) => (
        {
          ...r,
          components: r.components.filter((c, _) => !isPlaceholder(c))
        }
      ))
    }

    await window.data.savePlayerData(playerToSave)
  } catch (e) {
    throw e
  }
}

export async function loadPlayerData() : Promise<Player> {
  try {
    let player = await window.data.loadPlayerData()
    return tick(player).player
  } catch (e) {
    throw e
  }
}

//Function that handles idle income that should run every game tick
export type TickResult = {
  player: Player,
  incomeEarned: number
}

export function tick(player: Player) : TickResult {
  const idlyGeneratedIncome = getIdleIncomes(player)
  player = updateCurencyTimestamps(player)
  player.netWorth = player.netWorth + idlyGeneratedIncome

  return {
    player: player,
    incomeEarned: idlyGeneratedIncome
  }
}