import { NextResponse } from "next/server";
import { addAstronaut } from "@/services/playerService";

export async function POST(request: Request) {
    const body = await request.json()
    const username = body.username
    const astronautName = body.name

    await addAstronaut(username, astronautName)

    return NextResponse.json({status: 201})
}