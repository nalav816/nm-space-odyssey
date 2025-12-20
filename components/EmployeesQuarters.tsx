"use client"

import { useState } from "react"
import SectionCard from "./SectionCard"


export default function EmployeesQuarters({className} : {className?: string}){
    const ROOM_SIZE = 4

    const [employees, setEmployees] = useState([
        {
            name: "Scrub",
            modelUrl: "/sprites/scrub.png"
        },
        {
            name: "Scrub",
            modelUrl: "/sprites/scrub.png"
        },
        {
            name: "Ace",
            modelUrl: "/sprites/ace.png"
        },
        {
            name: "Scrub",
            modelUrl: "/sprites/scrub.png"
        },
    ])

    return (
        <SectionCard iconUrl={"/sprites/employeeIcon.png"} className = {"flex flex-col " + className} sectionName = "Employee's Quarters">
            <div className ="flex-1 flex-col flex justify-between">
                <div className="h-12 w-full flex p-4">
                    <div className = "basis-1/4 flex gap-2 items-center">
                        <img className="h-4 w-4 image-pixelated" src="/sprites/star.png"/>
                        <div className="text-sm"> 0 / {ROOM_SIZE} </div>
                    </div>
                    <div className = "basis-2/4 gap-4 flex justify-center items-center">
                        <button> &lt; </button>
                        <div className="text-sm"> Room 1 / 2 </div>
                        <button> &gt; </button>
                    </div>
                    <div className = "basis-1/4 flex gap-2 justify-end ">
                        <img className="h-4 w-4 image-pixelated" src="/sprites/star.png"/>
                        <div className="text-sm"> Rooms </div>
                    </div>
                </div>
                <div className = "h-24 w-full flex flex-col">
                    <div className="flex justify-center">
                        {employees.map((employee, i) => (
                            <img key={i} className="h-16 w-16 image-pixelated" src={employee.modelUrl}></img>
                        ))}

                    </div>
                    <div className="bg-repeat bg-[url('/sprites/floorTile.png')] w-full h-8 bg-size-[32px_32px] image-pixelated"></div>
                </div>
                
            </div>
            
        </SectionCard>
    )
}