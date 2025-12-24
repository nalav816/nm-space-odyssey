"use client"
import { useState } from "react"
import SectionCard from "./SectionCard"
import TiledSprite  from "./TiledSprite"
import TopBar from "./TopBar"
import { Employee, EmployeeData } from "./Employee"
import ColoredSprite from "./ColoredSprite"
import TintedSprite from "./TintedSprite"

export default function EmployeesQuarters({employeeData = [], className} : {employeeData?: EmployeeData[], className?: string}){
    const ROOM_SIZE = 5
    const currRoom = 1
    const roomCount = 2

    const [employees, setEmployees] = useState<EmployeeData[]>(employeeData)

    return (
        <SectionCard iconUrl={"/sprites/employeeQuartersIcon.png"} className = {"flex flex-col " + className} sectionName = "Employee's Quarters">
            <div className ="flex-1 flex-col flex justify-between">
                <TopBar items={employeeData.length} itemCapacity={ROOM_SIZE}/>
                <div className = "h-24 w-full flex flex-col items-center">
                    <div className="flex w-80 h-16">
                        {employees.map((employee: any, i: number) => (
                            <div className="w-16 h-16 flex items-end justify-center" key={i} >
                                <Employee employeeData={employee}/>
                            </div>
                            
                        ))}
                        {new Array(ROOM_SIZE - employees.length).fill(0).map((_, i) => (
                            <div className="w-16 h-16 flex items-end justify-center" key={i} >
                                <TintedSprite className="text-blue-darkest image-pixelated" spriteUrl="/sprites/scrub.png" tintIntensity={1}/>
                            </div>
                        ))}
                    </div>
                    <TiledSprite tileUrl={"/sprites/floorTile.png"} className="bg-blue-darker w-full h-8 image-pixelated"></TiledSprite>
                </div>
                
            </div>
            
        </SectionCard>
    )
}