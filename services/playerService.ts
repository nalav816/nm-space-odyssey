import { Astronauts } from "@/lib/prisma-client/client"
import { getAstronautView } from "@/views/astronaut"
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
        }
    })

    if (!data) throw new Error()

    return await getPlayerView(data)
}

export async function getPlayerShopData (username: string) {
    //The shop displays unlocked items and locked items marked visible
    const plrData = await db.user.findUnique({
        where: { username },
        include: {
            unlockedAstronauts: {
                include: {
                    astronautData: true
                }
            }
        }
    })

    const visibleOnLock = await db.astronauts.findMany({
        where: {
            hiddenOnLock: false
        },
    })

    if (!plrData || !visibleOnLock) throw new Error()
    
    const unlocked = plrData.unlockedAstronauts.map((unlockedAstronaut) => unlockedAstronaut.astronautData)
    const visibleYetLocked = visibleOnLock.filter((v) => !unlocked.some((v2) => v2.name == v.name))

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

export async function purchaseAstronaut(username: string, astronautName: string) {
    const astronaut = await db.ownedAstronauts.create({
        data: {
           astronautName,
           username
           
        },
        include : {
            astronautData: true
        }
    })

    if (!astronaut) throw new Error()

    const player = await db.user.update({
        where : { username },
        data : {
            netWorth : {
                decrement : astronaut.astronautData.price
            }
        }
    })

    if(!player) throw new Error("Player could not be charged for purchase.")

    return getAstronautView(astronaut)
}

export async function sellAstronaut(username: string, astronautId: string) {
    const astronaut = await db.ownedAstronauts.delete({
        where: {id: astronautId},
        include : {
            astronautData: true
        }
    })

    if (!astronaut) throw new Error("Astronaut to remove could not be found.")

    const player = await db.user.update({
        where : { username },
        data : {
            netWorth : {
                increment : astronaut.astronautData.price
            }
        }
    })

    if(!player) throw new Error("Player could not be refunded.")

    return getAstronautView(astronaut)
}