import { getPlayerShopData } from "@/services/playerService"
import { getComputedNetWorth } from "@/services/currencyService"
import { Astronaut, getAstronautView } from "./astronaut"
import { Shop } from "./shop"

export type Player = {
    username: string,
    netWorth: number,
    astronauts: Astronaut[],
    astronautRoomCount: number,
    roomSpaceCap: number,
    rocketPlotCount: number,
    plotSpaceCap: number,
    shop: Shop
}

export async function getPlayerView(player: any): Promise<Player> {
    return {
        username: player.username,
        netWorth: await getComputedNetWorth(player),
        astronauts: player.astronauts.map((a: any) => getAstronautView(a)),
        shop: await getPlayerShopData(player),
        astronautRoomCount: player.astronautRoomCount,
        roomSpaceCap: player.roomSpaceCap,
        rocketPlotCount: player.rocketPlotCount,
        plotSpaceCap: player.plotSpaceCap,
    }
}