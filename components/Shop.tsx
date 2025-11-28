'use client'
import SectionCard from "./SectionCard"
import { useState } from "react"

//Enum
const Categories = {
    Rockets: "Rockets",
    Astronauts: "Astronauts"
}

type Category = typeof Categories[keyof typeof Categories]

const CategoryButton = ({category, setCategory, active=true}: {category: Category, setCategory: () => void, active?:boolean}) => {
    return (
        <button onClick = {setCategory} className = {`rounded shadow-md w-32 h-6 text-blue-lightest
            text-sm transform transition duration-100 ease-in-out 
            ${active ? "bg-blue-dark text-white": "bg-blue-darkest hover:cursor-pointer hover:scale-105 hover:bg-blue-dark"}
            `}> {category} </button>
    )
}

export default function Shop({className} : {className?: string}){
    const [category, setCategory] = useState<Category>(Categories.Rockets)

    return (
        <SectionCard className = {className} sectionName = "Shop">
            <div className="p-2 flex gap-2">
               <CategoryButton setCategory = {() => setCategory(Categories.Rockets)} category={Categories.Rockets} active={category == Categories.Rockets}/>
                <CategoryButton setCategory = {() => setCategory(Categories.Astronauts)} category={Categories.Astronauts} active={category == Categories.Astronauts}/>
            </div>
            
        </SectionCard>
    )
}