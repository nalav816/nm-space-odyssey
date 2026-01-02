import { db } from "../lib/db"

async function getIdlyGeneratedDollars(username: string, now: number = Date.now()) {
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

    if (!player) throw new Error();
    if (player.astronauts.length == 0) return 0;

    let generated = 0;

    for (const a of player.astronauts) {
        if (a.isGeneratingDollars) {
            const generationStartTime = a.lastCurrencyUpdate.getTime();
            const timeElapsed = now - generationStartTime
            const secondsElapsed = Math.floor(timeElapsed / 1000)
            generated += (secondsElapsed * a.astronautData.dollarsPerSecond)
        }
    }

    return generated
}

async function updateTimestamps(username: string, now: number = Date.now()) {
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

    if (!player) throw new Error();
    if (player.astronauts.length == 0) return;

    for (const a of player.astronauts) {
        const generationStartTime = a.lastCurrencyUpdate.getTime();
        const timeElapsed = now - generationStartTime
        const secondsElapsed = Math.floor(timeElapsed / 1000)

        await db.ownedAstronauts.updateMany({
            where: { id: a.id },
            data: {
                //subtract now from millisecond layover so we can hold on to any additional milliseconds an idlly generating astronaut may
                //have existed for
                lastCurrencyUpdate: new Date(now - (timeElapsed - secondsElapsed))
            }
        })
    }
}

export async function getComputedDollarCount(username: string, now:number = Date.now()) {
    const player = await db.user.findUnique({
        where: { username }
    })

    if (!player) throw new Error();

    const netWorth = player.netWorth

    return netWorth
}

export async function updatePlayerDollarCount(username: string, increment: number = 0) {
    const now = Date.now()
    const result = await db.user.update({
        where: { username },
        data: {
            netWorth: (await getComputedDollarCount(username, now)) + increment
        }
    })

    if (!result) throw new Error("Player dollar count could not be set.")

    await updateTimestamps(username, now)
}



