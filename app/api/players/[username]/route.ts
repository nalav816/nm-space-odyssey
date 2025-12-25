import { NextResponse } from "next/server";
import { getPlayerData } from "@/services/playerService";

export async function GET(req: Request,  { params } : {params: {username:string}}) {
    const username = params.username
    console.log(username);
    const playerData = getPlayerData(username)

    return NextResponse.json(playerData)
}