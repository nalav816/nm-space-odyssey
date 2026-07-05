import { getComputedNetWorth, updateNetWorth } from "./currencyService"
import { getAstronautView, Astronaut } from "@/views/astronaut"
import { Prisma } from "@/lib/prisma-client/client"
import { db } from "../lib/db"

function isValidAstronautSlot(player: any, room: number, slot: number) {
    return !player.astronauts.some((a: any) => a.occupiedRoom == room && a.occupiedSlot == slot)
}

export async function purchaseAstronaut(username: string, astronautName: string, room: number, slot: number) {
    const astronaut = await db.$transaction(async (tx) => {
        const now = Date.now()
        const player = await tx.user.findUnique({
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

        const astronautData = await tx.astronauts.findUniqueOrThrow({
            where: { name: astronautName },
        })

        if (!astronautData) throw new Error("Astronaut cannot be found.")
        if (astronautData.price > await getComputedNetWorth(player, now)) throw new Error("Player cannot afford astronaut.")
        if (!isValidAstronautSlot(player, room, slot)) throw new Error("Invalid astronaut position.")

        const astronaut = await tx.ownedAstronauts.create({
            data: {
                astronautName,
                username,
                lastCurrencyUpdate: new Date(now),
                isGeneratingDollars: astronautData.isScientist,
                occupiedRoom: room,
                occupiedSlot: slot
            },
            include: {
                astronautData: true
            }
        })

        updateNetWorth(player, astronautData.price * -1, now)
        return astronaut
    })

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
        where: { id: astronautId },
        include: {
            astronautData: true
        }
    })

    if (!astronaut) throw new Error("Astronaut to remove could not be found.")

    await updateNetWorth(player, astronaut.astronautData.price, now)

    return getAstronautView(astronaut)
}