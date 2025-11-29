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
        <SectionCard className = {"flex flex-col " + className} sectionName = "Employee's Quarters">
            <div className ="flex-1 flex-col flex justify-end">
                <div className = "h-36 w-full flex flex-col">
                    <div className="flex justify-center">
                        {employees.map((employee, i) => (
                            <img key={i} className="h-16 w-16 image-pixelated" src={employee.modelUrl}></img>
                        ))}

                    </div>
                    <div className="bg-repeat bg-[url('/sprites/floorTile.png')] w-full h-8 bg-size-[32px_32px] image-pixelated"></div>
                    <div className="flex justify-center relative gap-4">
                        <button> &lt; </button>
                        <div>  1 </div>
                        <button> &gt; </button>
                    </div>
                </div>
                
            </div>
            
        </SectionCard>
    )
}