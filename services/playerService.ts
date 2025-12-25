import { Astronauts } from "@/lib/prisma-client/client"
import { db } from "../lib/db"

export async function getPlayerData(userName: string){
    const data = await db.user.findUnique({
        where: { userName },
        include: {
            astronauts: {
                include: {
                    astronautData: true
                }
            },
        }
    })

    console.log(data)
    if (!data) throw new Error()

    const packet = {
        netWorth: data.netWorth,
        astronauts: data.astronauts.map((a) => ({
            modelUrl: a.astronautData.modelUrl,
            isEngineer: a.astronautData.isEngineer,
            isResearcher: a.astronautData.isResearcher,
            isPilot: a.astronautData.isPilot
        })),
        shopData: await getPlayerShopData(userName)
    }

    return packet
}

export async function getPlayerShopData (userName: string) {
    //The shop displays unlocked items and locked items marked visible
    const plrData = await db.user.findUnique({
        where: {userName},
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
    const visibleYetLocked = visibleOnLock.filter((item) => !(item.name in unlocked))

    const shopItemView = (shopItemEntry: Astronauts) => {
        return { 
            name: shopItemEntry.name,
            rating: shopItemEntry.rating,
            price: shopItemEntry.price,
            iconUrl: shopItemEntry.shopIconUrl,
            isEngineer: shopItemEntry.isEngineer,
            isResearcher: shopItemEntry.isResearcher,
            isPilot: shopItemEntry.isPilot,
            isLocked: shopItemEntry.name in visibleYetLocked
        }
    }

    const packet = {
        Astronauts: [...unlocked, ...visibleYetLocked].map((v) => shopItemView(v)),
        Rockets: []
    }

    return packet
}

export async function addAstronaut(ownerName: string, astronautName: string) {
    await db.ownedAstronauts.create({
        data: {
            ownerName,
            astronautName
        }
    })
}