import { NextResponse } from "next/server";
import { purchaseAstronaut, sellAstronaut } from "@/services/shopService";

export async function POST(request: Request) {
    const body = await request.json()
    const username = body.username
    const astronautName = body.name
    const purchaseTime = body.purchaseTime

    const newAstronaut = await purchaseAstronaut(username, astronautName, purchaseTime)

    return NextResponse.json({
        newAstronaut: newAstronaut,
        status: 201
    })
}

export async function DELETE(request: Request) {
    const body = await request.json()
    const username = body.username
    const astronautId = body.id
    const sellTime = body.sellTime

    const deletedAstronaut = await sellAstronaut(username, astronautId, sellTime)

    return NextResponse.json({
        deletedAstronaut: deletedAstronaut,
        status: 200
    })
}