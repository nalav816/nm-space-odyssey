import { getComputedNetWorth, updateNetWorth } from "./currencyService"
import { getAstronautView } from "@/views/astronaut"
import { db } from "../lib/db"

function getAvailableAstronautSlot(player: any) {
    let earliestAvailableSlot = 1
    let earliestAvailableRoom = 1

    player.astronauts.sort((a: any, b: any) => {
        if (a.occupiedRoom != b.occupiedRoom) {
            return a.occupiedRoom - b.occupiedRoom
        }

        return a.occupiedSlot - b.occupiedSlot
    })

    for (const a of player.astronauts) {
        if (a.occupiedSlot == earliestAvailableSlot && a.occupiedRoom == earliestAvailableRoom) {
            earliestAvailableSlot += 1
            if (earliestAvailableSlot > player.roomSpaceCap) {
                earliestAvailableSlot = 1
                earliestAvailableRoom += 1
            }
        } else {
            break
        }
    }

    return {
        room: earliestAvailableRoom,
        slot: earliestAvailableSlot
    }
}

async function assignAstronautSlot(player: any, astronaut: any) {
    const {slot, room} = getAvailableAstronautSlot(player)

    astronaut = await db.ownedAstronauts.update({
        where: { id: astronaut.id },
        data: {
            occupiedRoom: room,
            occupiedSlot: slot
        },
        include: {
            astronautData: true
        }
    })

    console.log(room + " " + slot)
    return astronaut
}

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
        where: { name: astronautName },
        select: {
            price: true
        }

    })

    if (!astronautPrice) throw new Error("Astronaut cannot be found.")
    if (astronautPrice.price > await getComputedNetWorth(player, now)) throw new Error("Player cannot afford astronaut.")

    let astronaut = await db.ownedAstronauts.create({
        data: {
            astronautName,
            username,
            lastCurrencyUpdate: new Date(now)

        },
        include: {
            astronautData: true
        }
    })

    //assign astronaut slot
    try {
        astronaut = await assignAstronautSlot(player, astronaut)
    } catch (e) {
        console.log("Astronaut slot could not be correctly assigned because of the following error: " + e)
    }

    console.log(astronaut)

    //toggle idle generation
    if (astronaut.astronautData.isScientist) {
        await db.ownedAstronauts.update({
            where: { id: astronaut.id },
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
        where: { id: astronautId },
        include: {
            astronautData: true
        }
    })

    if (!astronaut) throw new Error("Astronaut to remove could not be found.")

    await updateNetWorth(player, astronaut.astronautData.price, now)

    return getAstronautView(astronaut)
}