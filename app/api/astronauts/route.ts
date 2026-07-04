import { NextResponse } from "next/server";
import { purchaseAstronaut, sellAstronaut } from "@/services/astronautService";

export async function POST(request: Request) {
    const body = await request.json()
    const username = body.username
    const astronautName = body.name

    const newAstronaut = await purchaseAstronaut(username, astronautName)

    return NextResponse.json({
        newAstronaut: newAstronaut,
        status: 201
    })
}

export async function DELETE(request: Request) {
    const body = await request.json()
    const username = body.username
    const astronautId = body.id

    const deletedAstronaut = await sellAstronaut(username, astronautId)

    return NextResponse.json({
        deletedAstronaut: deletedAstronaut,
        status: 200
    })
}