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
        <button onClick={setCategory} className={`rounded shadow-md w-32 h-6 text-white
            text-sm transform transition duration-100 ease-in-out 
            ${active ? "bg-blue-dark" : "bg-blue-darkest hover:cursor-pointer hover:scale-105 hover:bg-blue-dark"}
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

const shopData: Record<Category, ShopItem[]> = {
    Rockets: [],
    Astronauts: [
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        },
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        },
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        },
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        },
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        },
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        },
        {
            name: "Scrub",
            iconUrl: "/sprites/scrubShopIcon.png",
            rating: 1,
            price: 100,
        },
    ]
}

const ShopItem = ({ iconUrl, rating, name, price }: { iconUrl: string, rating: number, name: string, price: number }) => {
    return (
        <div className="bg-linear-to-b rounded overflow-hidden shadow-md from-blue to-blue-dark noise-texture w-full h-16 flex transform transition duration-200 ease-in-out hover:cursor-pointer hover:-translate-y-1">
            <div className="h-16 w-16 bg-blue-darker border-r-2 border-blue-dark">
                <img className="h-16 w-16 image-pixelated" src={iconUrl} />

            </div>
            <div className="px-3 py-1 flex flex-col">
                <div className="text-xl leading-none"> {name} </div>
                <div className="flex py-[1px] gap-1">
                    {Array(rating)
                        .fill(0)
                        .map((_, index) => (

                            <img
                                key={index}
                                className="h-4 w-4 image-pixelated"
                                src="/sprites/star.png"
                                alt={`star-${index}`}
                            />


                        ))}
                    {Array(5 - rating)
                        .fill(0)
                        .map((_, index) => (

                            <img
                                key={index}
                                className="h-4 w-4 image-pixelated"
                                src="/sprites/emptyStar.png"
                                alt={`star-${index}`}
                            />


                        ))}
                </div>
                <div className="text-green leading-none"> ${price} </div>
            </div>
        </div>
    )
}

export default function Shop({ className }: { className?: string }) {
    const [category, setCategory] = useState<Category>(Categories.Astronauts)

    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Shop">
            <div className="px-4 py-2 flex gap-2">
                <CategoryButton setCategory={() => setCategory(Categories.Rockets)} category={Categories.Rockets} active={category == Categories.Rockets} />
                <CategoryButton setCategory={() => setCategory(Categories.Astronauts)} category={Categories.Astronauts} active={category == Categories.Astronauts} />
            </div>

            <div className="p-4 pb-6 flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto scrollbar-custom">
                    <div className="flex flex-col pt-1 gap-4 pr-3">


                        {shopData[category].map((val, i) => (
                            <ShopItem key={i} iconUrl={val.iconUrl} rating={val.rating} name={val.name} price={val.price} />
                        ))}
                    </div>
                </div>

            </div>

        </SectionCard>
    )
}