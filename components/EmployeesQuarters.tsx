"use client"

import { useState } from "react"
import SectionCard from "./SectionCard"

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
                <div className="h-12 w-full flex justify-between p-4">
                    <div className = "flex items-center w-16 gap-2">
                        <img className="h-4 w-4 image-pixelated" src="/sprites/employeeIcon.png"/>
                        <div className="text-sm"> 4 / {ROOM_SIZE} </div>
                    </div>
                    <div className = "basis-2/4 gap-4 flex justify-center items-center">
                        <button className="hover:text-blue-lightest hover:cursor-pointer text-2xl"> &lt; </button>
                        <div className="text-md"> Room <span className="text-blue">{" " + currRoom} / {roomCount}</span> </div>
                        <button className="hover:text-blue-lightest hover:cursor-pointer text-2xl"> &gt; </button>
                    </div>
                    <div className = "flex justify-end gap-2 w-16">
                        <button className="bg-blue rounded-md shadow hover:cursor-pointer hover:bg-blue-dark">
                            <img className="h-4 w-4 image-pixelated" src="/sprites/plusIcon.png"/>
                        </button>
                        
                        <div className="text-sm"> Rooms </div>
                    </div>
                </div>
                <div className = "h-24 w-full flex flex-col items-center">
                    <div className="flex w-64 h-16">
                        {employees.map((employee: any, i: number) => (
                            <img key={i} className="h-16 w-16 image-pixelated" src={employee.modelUrl}></img>
                        ))}
                    </div>
                    <div className="bg-repeat bg-[url('/sprites/floorTile.png')] w-full h-8 bg-size-[32px_32px] image-pixelated"></div>
                </div>
                
            </div>
            
        </SectionCard>
    )
}