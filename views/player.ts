import { getPlayerShopData } from "@/services/playerService"
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
        username: player.userName,
        netWorth: player.netWorth,
        astronauts: player.astronauts.map((a: any) => getAstronautView(a.astronautData)),
        shop: await getPlayerShopData(player.userName)
    }
}