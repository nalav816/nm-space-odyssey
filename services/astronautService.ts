import { getComputedNetWorth, updateNetWorth } from "./currencyService"
import { getAstronautView } from "@/views/astronaut"
import { db } from "../lib/db"
import { Player } from "@/views/player"

export async function purchaseAstronaut(username: string, astronautName: string) {
    const now = Date.now()
    const player = await db.user.findUnique({
        where: { username },
        include: {
            astronauts: {
                include: {
                    astronautData: true
                }
            }
        }
    })

    if (!player) throw new Error("Player can not be found.")

    const astronautPrice = await db.astronauts.findUniqueOrThrow({
        where: {name : astronautName},
        select: {
            price: true
        }
    })

    if (!astronautPrice) throw new Error ("Astronaut cannot be found.")
    if (astronautPrice.price > await getComputedNetWorth(player, now)) throw new Error("Player cannot afford astronaut.")

    let astronaut = await db.ownedAstronauts.create({
        data: {
           astronautName,
           username,
           lastCurrencyUpdate: new Date(now)
           
        },
        include : {
            astronautData: true
        }
    })

    //toggle idle generation
    if (astronaut.astronautData.isScientist) {
        await db.ownedAstronauts.update({
            where: {id: astronaut.id},
            data: {
                isGeneratingDollars: true
            }
        })
    }

    updateNetWorth(player, astronaut.astronautData.price * -1, now)

    return getAstronautView(astronaut)
}

export async function sellAstronaut(username: string, astronautId: string) {
    const now = Date.now()
     const player = await db.user.findUnique({
        where: { username },
        include: {
            astronauts: {
                include: {
                    astronautData: true
                }
            }
        }
    })

    if (!player) throw new Error("Player can not be found.")
    
    //Update player dollar count before deletion to add any dollars the deleted astronaut might have generated
    await updateNetWorth(player, 0, now)

    const astronaut = await db.ownedAstronauts.delete({
        where: {id: astronautId},
        include : {
            astronautData: true
        }
    })

    if (!astronaut) throw new Error("Astronaut to remove could not be found.")

    await updateNetWorth(player, astronaut.astronautData.price, now)

    return getAstronautView(astronaut)
}