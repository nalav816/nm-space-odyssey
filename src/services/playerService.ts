
import type { Shop } from "./shopService"
import { getIdleIncomes, updateCurencyTimestamps } from "../services/astronautService";

export interface Player {
  username: string,
  netWorth: number,
  astronauts: any[],
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
    const idlyGeneratedIncome = getIdleIncomes(player)
    player = updateCurencyTimestamps(player)
    player.netWorth = player.netWorth + idlyGeneratedIncome

    return player
  } catch (e) {
    throw e
  }
}