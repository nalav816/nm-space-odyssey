"use client"
import TintedSprite from "./TintedSprite"
import { useState, useEffect } from "react"

export type EmployeeData = {
    name: string,
    rating: number,
    modelUrl: string,
    shopIconUrl: string,
}

export function Employee ({employeeData} : {employeeData:EmployeeData}) {

    return (
        <TintedSprite className="image-pixelated" spriteUrl={employeeData.modelUrl} tintIntensity={0}/>
    )
}