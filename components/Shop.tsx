'use client'
import SectionCard from "./SectionCard"
import { useState } from "react"

//Enum
const Categories = {
    Rockets: "Rockets",
    Astronauts: "Astronauts"
}

type Category = typeof Categories[keyof typeof Categories]

const CategoryButton = ({ category, setCategory, active = true }: { category: Category, setCategory: () => void, active?: boolean }) => {
    return (
        <button onClick={setCategory} className={`rounded shadow-md w-32 h-6 text-blue-lightest
            text-sm transform transition duration-100 ease-in-out 
            ${active ? "bg-blue-dark text-white" : "bg-blue-darkest hover:cursor-pointer hover:scale-105 hover:bg-blue-dark"}
            `}> {category} </button>
    )
}

interface ShopItem {
  name: string;
  iconUrl: string;
  rating: number;
  price: number;
}

interface ShopData {
  Rockets: ShopItem[];
  Astronauts: ShopItem[];
}

const shopData : Record<Category, ShopItem[]> = {
    Rockets: [],
    Astronauts: [
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        }
    ]
}

const ShopItem = ({ iconUrl, rating, name, price }: { iconUrl: string, rating: number, name: string, price: number }) => {
    return (
        <div className="bg-linear-to-b rounded shadow-md from-blue to-blue-dark w-full h-16 flex transform transition duration-100 ease-in-out hover:cursor-pointer hover:-translate-y-1">
            <div className = "h-16 w-16 bg-blue-darker rounded-l-xs">
                <img className = "h-16 w-16 image-pixelated" src={iconUrl}/>

            </div>
        </div>
    )
}

export default function Shop({ className }: { className?: string }) {
    const [category, setCategory] = useState<Category>(Categories.Rockets)

    return (
        <SectionCard className={className} sectionName="Shop">
            <div className="px-4 py-2 flex gap-2">
                <CategoryButton setCategory={() => setCategory(Categories.Rockets)} category={Categories.Rockets} active={category == Categories.Rockets} />
                <CategoryButton setCategory={() => setCategory(Categories.Astronauts)} category={Categories.Astronauts} active={category == Categories.Astronauts} />
            </div>

            <div className = "p-4">
                {shopData[category].map((val, i) => (
                    <ShopItem key={i} iconUrl={val.iconUrl} rating={val.rating} name={val.name} price={val.price}/>
                ))}
            </div>

        </SectionCard>
    )
}