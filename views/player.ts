import { getPlayerShopData } from "@/services/playerService"
import { getComputedNetWorth } from "@/services/currencyService"
import { Astronaut, getAstronautView } from "./astronaut"
import { Shop } from "./shop"

export type Player = {
    username: string,
    netWorth: number,
    astronauts: Astronaut[],
    shop: Shop
}

export async function getPlayerView(player: any) : Promise<Player> {
    return {
        username: player.username,
        netWorth: await getComputedNetWorth(player),
        astronauts: player.astronauts.map((a: any) => getAstronautView(a)),
        shop: await getPlayerShopData(player)
    }
}