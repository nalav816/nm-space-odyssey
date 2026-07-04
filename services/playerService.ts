import { Astronauts } from "@/lib/prisma-client/client"
import { getShopItemView, ShopItem, sortShopItems } from "@/views/shop"
import { getPlayerView } from "@/views/player"
import { db } from "../lib/db"

export async function getPlayerData(username: string){
    const data = await db.user.findUnique({
        where: { username },
        include: {
            astronauts: {
                include: {
                    astronautData: true
                }
            },
            unlockedAstronauts: {
                include: {
                    astronautData: true
                }
            }
        }
    })

    if (!data) throw new Error()

    return await getPlayerView(data)
}

export async function getPlayerShopData (player: any) {
    const visibleOnLock = await db.astronauts.findMany({
        where: {
            hiddenOnLock: false
        },
    })
    
    const unlocked = player.unlockedAstronauts.map((ua : any) => ua.astronautData)
    const visibleYetLocked = visibleOnLock.filter((v) => !unlocked.some((u: any) => u.name == v.name))

    const shopItemView = (shopItemEntry: Astronauts) => {
        return { 
            ...getShopItemView(shopItemEntry),
            isLocked: visibleYetLocked.some((item) => item.name == shopItemEntry.name)
        }
    }

    const packet = {
        Astronauts: [...unlocked, ...visibleYetLocked].map((v) => shopItemView(v)).sort((a:ShopItem, b:ShopItem) => sortShopItems(a, b)),
        Rockets: []
    }

    return packet
}