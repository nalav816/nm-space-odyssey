'use client'
import ColoredSprite from "./ColoredSprite"
import SectionCard from "./SectionCard"
import { useState } from "react"
import type { Player } from "@/views/player"
import type { Shop, ShopItem } from "@/views/shop"

const CategoryButton = ({ category, setCategory, active = true }: { category: Category, setCategory: () => void, active?: boolean }) => {
    return (
        <button onClick={setCategory} className={`rounded shadow-md w-32 h-6 text-white
            text-sm transform transition duration-100 ease-in-out 
            ${active ? "bg-blue-darker" : "bg-blue-darkest hover:cursor-pointer hover:scale-105 hover:bg-blue-darker"}
            `}> {category} </button>
    )
}

type Category = keyof Shop;

const JobIndicator = ({ shopItem }: { shopItem: ShopItem }) => {
    return (
        <div className="absolute right-0 top-0">
            <div className="absolute rounded-lg w-full h-full z-20 blur-sm bg-blue-darkest/70" />
            <div className="flex flex-col p-1 z-30 relative gap-1">
                {shopItem.isPilot && (<img className="w-4 h-4 image-pixelated" src="/sprites/pilotIcon.png" />)}
                {shopItem.isScientist && (<img className="w-4 h-4 image-pixelated" src="/sprites/scientistIcon.png" />)}
                {shopItem.isEngineer && (<img className="w-4 h-4 image-pixelated" src="/sprites/engineerIcon.png" />)}
            </div>
        </div>
    )
}

const ShopItem = ({ player, setPlayer, shopItem, disabled = false }
    : { player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, shopItem: ShopItem, disabled?: boolean, locked?: boolean }) => {

    if (shopItem.isLocked || player.netWorth < shopItem.price) disabled = true

    const onClick = async () => {
        if (shopItem.price <= player.netWorth) {
            const res = await fetch("/api/astronauts", {
                method: "POST",
                body: JSON.stringify({
                    username: player.username,
                    name: shopItem.name
                })
            })

            if (res.ok) {
                const data = await res.json();
                const newAstronaut = data.newAstronaut;
                console.log(data, newAstronaut)
                console.log(shopItem.name + " Purchased!")
                setPlayer((prev) => ({
                    ...prev,
                    ...{
                        netWorth: prev.netWorth - shopItem.price,
                        astronauts: [...prev.astronauts, newAstronaut]
                    }
                }))
            }
        }
    }

    return (
        <div onClick={onClick} className={`relative mr-2 shrink-0 bg-linear-to-b rounded overflow-hidden 
            shadow-md from-blue to-blue-dark
            h-16 flex transition duration-200 ease-in-out
            ${disabled ? "" : "hover:cursor-pointer hover:to-blue"}`
        }>
            <div className="absolute noise-texture w-full h-full rounded" />
            <div className="z-30 h-16 w-16 bg-blue-darker border-r-2 border-blue-dark relative">
                {shopItem.isLocked ?
                    (<ColoredSprite className="h-16 w-16 image-pixelated bg-blue-darkest" spriteUrl={shopItem.iconUrl} />)
                    :
                    (<img className="h-16 w-16 image-pixelated" src={shopItem.iconUrl} />)
                }
                <JobIndicator shopItem={shopItem} />
            </div>

            {disabled && (<div className="absolute w-full h-full bg-blue-darkest/50 rounded z-50" />)}

            <div className="px-3 py-0.5 flex flex-col">
                <div className="text-2xl leading-none text-shadow"> {shopItem.isLocked ? "???" : shopItem.name} </div>
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
                <div className={`py-0.5 text-sm leading-none ${disabled ? "text-red-light text-glow-red" : "text-green text-glow-green"}`}> ${shopItem.price} </div>
            </div>
        </div>
    )
}

export default function Shop({ player, className, setPlayer }:
    { player: Player, className?: string, setPlayer: React.Dispatch<React.SetStateAction<Player>> }) {
    const [category, setCategory] = useState<Category>("Astronauts")
    console.log(player)
    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Shop" iconUrl="/sprites/shopIcon.png">
            <div className="p-4 flex gap-2">
                <CategoryButton setCategory={() => setCategory("Astronauts")} category={"Astronauts"} active={category == "Astronauts"} />
                <CategoryButton setCategory={() => setCategory("Rockets")} category={"Rockets"} active={category == "Rockets"} />
            </div>

            <div className="flex items-stretch overflow-auto min-h-0 flex-1 mx-4 mb-4 justify-start flex-col gap-4 scrollbar-custom">
                {player.shop[category].map((shopItem, i) => (
                    <ShopItem player={player} setPlayer={setPlayer} key={i} shopItem={shopItem} />
                ))}
            </div>
        </SectionCard>
    )
}