"use client"
import { useState } from "react"
import SectionCard from "./SectionCard"
import TiledSprite  from "./TiledSprite"
import TopBar from "./TopBar"

type Employee = {
    name: string,
    rating: number,
    modelUrl: string,
    shopIconUrl: string,
}

export default function EmployeesQuarters({employeeData = [], className} : {employeeData?: Employee[], className?: string}){
    const ROOM_SIZE = 4
    const currRoom = 1
    const roomCount = 2

    const [employees, setEmployees] = useState<Employee[]>(employeeData)

    return (
        <SectionCard iconUrl={"/sprites/employeeQuartersIcon.png"} className = {"flex flex-col " + className} sectionName = "Employee's Quarters">
            <div className ="flex-1 flex-col flex justify-between">
                <TopBar/>
                <div className = "h-24 w-full flex flex-col items-center">
                    <div className="flex w-64 h-16">
                        {employees.map((employee: any, i: number) => (
                            <img key={i} className="h-16 w-16 image-pixelated" src={employee.modelUrl}></img>
                        ))}
                    </div>
                    <TiledSprite tileUrl={"/sprites/floorTile.png"} className="bg-blue-darker w-full h-8 image-pixelated"></TiledSprite>
                </div>
                
            </div>
            
        </SectionCard>
    )
}