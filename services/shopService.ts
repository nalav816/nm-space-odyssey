import { getComputedDollarCount, updatePlayerDollarCount } from "./currencyService"
import { getAstronautView } from "@/views/astronaut"
import { db } from "../lib/db"

export async function purchaseAstronaut(username: string, astronautName: string) {
    const now = Date.now()
    const astronautPrice = await db.astronauts.findUniqueOrThrow({
        where: {name : astronautName},
        select: {
            price: true
        }
    })

    if (astronautPrice.price > await getComputedDollarCount(username, now)) throw new Error("Player cannot afford astronaut.")

    let astronaut = await db.ownedAstronauts.create({
        data: {
           astronautName,
           username
           
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

    updatePlayerDollarCount(username, astronaut.astronautData.price * -1)

    return getAstronautView(astronaut)
}

export async function sellAstronaut(username: string, astronautId: string) {
    //Update player dollar count before deletion to add any dollars the deleted astronaut might have generated
    updatePlayerDollarCount(username)

    const astronaut = await db.ownedAstronauts.delete({
        where: {id: astronautId},
        include : {
            astronautData: true
        }
    })

    if (!astronaut) throw new Error("Astronaut to remove could not be found.")

    updatePlayerDollarCount(username, astronaut.astronautData.price)

    return getAstronautView(astronaut)
}