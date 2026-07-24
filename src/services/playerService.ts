
import type { Shop } from "./shopService"
import { getIdleIncomes, updateCurencyTimestamps } from "../services/astronautService";
import { Rocket } from "./rocketService";

export interface Player {
  username: string,
  netWorth: number,
  astronauts: any[],
  rockets: Rocket[],
  astronautRoomCount: number,
  roomSpaceCap: number,
  rocketPlotCount: number,
  shop: Shop
}

export async function savePlayerData(player: Player) {
  try {
    await window.data.savePlayerData(player)
  } catch (e) {
    throw e
  }
}

export async function loadPlayerData() {
  try {
    let player = await window.data.loadPlayerData()
    return tick(player)
  } catch (e) {
    throw e
  }
}

//Function that handles idle income that should run every game tick
export function tick(player: Player) {
  const idlyGeneratedIncome = getIdleIncomes(player)
  player = updateCurencyTimestamps(player)
  player.netWorth = player.netWorth + idlyGeneratedIncome

  return player
}