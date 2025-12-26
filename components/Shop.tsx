'use client'
import ColoredSprite from "./ColoredSprite"
import SectionCard from "./SectionCard"
import { useState } from "react"

const CategoryButton = ({ category, setCategory, active = true }: { category: Category, setCategory: () => void, active?: boolean }) => {
    return (
        <button onClick={setCategory} className={`rounded shadow-md w-32 h-6 text-white
            text-sm transform transition duration-100 ease-in-out 
            ${active ? "bg-blue-darker" : "bg-blue-darkest hover:cursor-pointer hover:scale-105 hover:bg-blue-darker"}
            `}> {category} </button>
    )
}

type ShopItem = {
    name: string;
    rating: number;
    price: number
    iconUrl: string;
    isLocked: boolean;
    isEngineer?: boolean;
    isResearcher?: boolean;
    isPilot?: boolean;
}

export type ShopData = {
    Astronauts: ShopItem[];
    Rockets: ShopItem[];
}

type Category = keyof ShopData;

const JobIndicator = ({ shopItem }: { shopItem: ShopItem }) => {
    return (
        <div className="absolute right-0 top-0">
            <div className="absolute rounded-lg w-full h-full z-20 blur-sm bg-blue-darkest/50" />
            <div className="flex flex-col p-1 z-30 relative gap-1">
                {shopItem.isPilot && (<img className="w-4 h-4 image-pixelated" src="/sprites/pilotIcon.png"/>)}
                {shopItem.isResearcher && (<img className="w-4 h-4 image-pixelated" src="/sprites/researcherIcon.png"/>)}
                {shopItem.isEngineer && (<img className="w-4 h-4 image-pixelated" src="/sprites/engineerIcon.png"/>)}
            </div>
        </div>
    )

}

const ShopItem = ({ cash, setCash, shopItem, disabled = false }
    : { cash: number, setCash: React.Dispatch<React.SetStateAction<number>>, shopItem: ShopItem, disabled?: boolean, locked?: boolean }) => {

    if (shopItem.isLocked || cash < shopItem.price) disabled = true

    const onClick = () => {
        if(shopItem.price <= cash){
            setCash((prev) => prev - shopItem.price)
        }
    }

    return (
        <div onClick={onClick} className={`relative mr-2 shrink-0 bg-linear-to-b rounded overflow-hidden 
            shadow-md from-blue to-blue-dark
            h-16 flex transition duration-200 ease-in-out
            ${disabled ? "" : "hover:cursor-pointer hover:to-blue"}`
        }>
            <div className="absolute noise-texture w-full h-full rounded"/>
            <div className="z-30 h-16 w-16 bg-blue-darker border-r-2 border-blue-dark relative">
                {shopItem.isLocked ?
                    (<ColoredSprite className="h-16 w-16 image-pixelated bg-blue-darkest" spriteUrl={shopItem.iconUrl} />)
                    :
                    (<img className="h-16 w-16 image-pixelated" src={shopItem.iconUrl} />)
                }
                <JobIndicator shopItem={shopItem}/>
            </div>

            {disabled && (<div className="absolute w-full h-full bg-blue-darkest/50 rounded z-50" />)}

            <div className="px-3 py-0.5 flex flex-col">
                <div className="text-2xl leading-none"> {shopItem.isLocked ? "???" : shopItem.name} </div>
                <div className="flex gap-1">
                    {Array(shopItem.rating)
                        .fill(0)
                        .map((_, index) => (

                            <img
                                key={index}
                                className="h-4 w-4 image-pixelated"
                                src="/sprites/star.png"
                                alt={`star-${index}`}
                            />


                        ))}
                    {Array(5 - shopItem.rating)
                        .fill(0)
                        .map((_, index) => (
                            <ColoredSprite key={index}
                                className="h-4 w-4 bg-blue-darker image-pixelated"
                                spriteUrl="/sprites/star.png"
                            />
                        ))}
                </div>
                <div className={`py-0.5 text-sm leading-none ${disabled ? "text-red-light text-glow-red" : "text-green"}`}> ${shopItem.price} </div>
            </div>
        </div>
    )
}

export default function Shop({ shopData, className, cash, setCash }: 
    { shopData: ShopData, className?: string, cash: number, setCash: React.Dispatch<React.SetStateAction<number>>}) {
    const [category, setCategory] = useState<Category>("Astronauts")

    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Shop" iconUrl="/sprites/shopIcon.png">
            <div className="p-4 flex gap-2">
                <CategoryButton setCategory={() => setCategory("Astronauts")} category={"Astronauts"} active={category == "Astronauts"} />
                <CategoryButton setCategory={() => setCategory("Rockets")} category={"Rockets"} active={category == "Rockets"} />
            </div>

            <div className="flex items-stretch overflow-auto min-h-0 flex-1 mx-4 mb-4 justify-start flex-col gap-4 scrollbar-custom">
                {shopData[category].map((shopItem, i) => (
                    <ShopItem cash={cash} setCash={setCash}key={i} shopItem={shopItem} />
                ))}
            </div>
        </SectionCard>
    )
}