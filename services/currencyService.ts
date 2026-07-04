import { db } from "../lib/db"

async function getIdlyGeneratedDollars(player: any, now: number = Date.now()) {
    console.log(player)
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

async function updateTimestamps(player: any, now: number = Date.now()) {
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
                lastCurrencyUpdate: new Date(now - (timeElapsed - secondsElapsed * 1000))
            }
        })
    }
}

export async function getComputedNetWorth(player: any, now:number = Date.now()) {
    const netWorth = player.netWorth + await getIdlyGeneratedDollars(player, now)

    return netWorth
}

export async function updateNetWorth(player: any, increment: number = 0, now:number = Date.now()) {
    const result = await db.user.update({
        where: { username: player.username },
        data: {
            netWorth: (await getComputedNetWorth(player, now)) + increment
        }
    })

    if (!result) throw new Error("Player dollar count could not be set.")

    console.log(result.netWorth)
    
    await updateTimestamps(player, now)
}



