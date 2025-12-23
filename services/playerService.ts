import { db } from "../lib/db"

export async function getPlayerData(userName: string){
    const data = await db.user.findUnique({
        where: { userName },
        include: {
            astronauts: {
                include: {
                    astronautData: true
                }
            }

        }
    })

    console.log(data)
    if (!data) throw new Error()

    const packet = {
        netWorth: data.netWorth,
        astronauts: data.astronauts.map((a) => ({
            name: a.astronautData.name,
            rating: a.astronautData.rating,
            modelUrl: a.astronautData.modelUrl,
            shopIconUrl: a.astronautData.shopIconUrl
        }))
    }

    return packet
}

export async function purchaseAstronaut(ownerName: string, astronautName: string) {
    await db.ownedAstronauts.create({
        data: {
            ownerName,
            astronautName
        }
    })
}