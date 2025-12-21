import { NextResponse } from "next/server"
import { getPlayerData  } from "@/services/playerService"

export async function GET(req: Request){
    const userName = "Nadden"
    return NextResponse.json(getPlayerData(userName));
}