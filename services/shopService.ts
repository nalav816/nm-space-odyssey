import { getComputedNetWorth, updatePlayerNetWorth } from "./currencyService"
import { getAstronautView } from "@/views/astronaut"
import { db } from "../lib/db"

export async function purchaseAstronaut(username: string, astronautName: string, now: number) {
    //makes sure time passed from the client matches or is very similar to currentTime to prevent exploits
    if (Math.abs(Date.now() - now) > 2000) throw new Error("Client time is not synced with server time.")

    const astronautPrice = await db.astronauts.findUniqueOrThrow({
        where: {name : astronautName},
        select: {
            price: true
        }
    })

    if (astronautPrice.price > await getComputedNetWorth(username, now)) throw new Error("Player cannot afford astronaut.")

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

    if (!astronaut) throw new Error()

    //toggle idle generation
    if (astronaut.astronautData.isScientist) {
        await db.ownedAstronauts.update({
            where: {id: astronaut.id},
            data: {
                isGeneratingDollars: true
            }
        })
    }

    updatePlayerNetWorth(username, astronaut.astronautData.price * -1, now)

    return getAstronautView(astronaut)
}

export async function sellAstronaut(username: string, astronautId: string, now: number) {
    if (Math.abs(Date.now() - now) > 2000) throw new Error("Client time is not synced with server time.")
    
    //Update player dollar count before deletion to add any dollars the deleted astronaut might have generated
    await updatePlayerNetWorth(username, 0, now)

    const astronaut = await db.ownedAstronauts.delete({
        where: {id: astronautId},
        include : {
            astronautData: true
        }
    })

    if (!astronaut) throw new Error("Astronaut to remove could not be found.")

    await updatePlayerNetWorth(username, astronaut.astronautData.price, now)

    return getAstronautView(astronaut)
}