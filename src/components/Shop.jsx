'use client'
import ColoredSprite from "./ColoredSprite"
import SectionCard from "./SectionCard"
import { useState } from "react"
import type { Player } from "@/views/player"
import type { Shop, ShopItem } from "@/views/shop"
import { usePlayer } from "@/hooks/usePlayer"
import { getNextAvailableQuartersSlot } from "./AstronautQuarters"

const CategoryButton = ({ category, setCategory, active = true }: { category: Category, setCategory: () => void, active?: boolean }) => {
    return (
        <button onClick={setCategory} className={`relative rounded w-32 h-6 text-white
            text-sm transform transition duration-100 ease-in-out 
            ${active ? "bg-blue-light box-shadow" : "bg-blue-dark hover-shadow hover:cursor-pointer hover:bg-blue-light transition duration-300"}
            `}>
            <div className="relative z-40"> {category}  </div>
        </button>
    )
}

type Category = keyof Shop;

const JobIndicator = ({ shopItem }: { shopItem: ShopItem }) => {
    return (
        <div className="absolute right-0 top-0">
            <div className="absolute rounded-lg w-full h-full z-20 blur-sm bg-blue-darker/70" />
            <div className="flex flex-col p-1 z-30 relative gap-1">
                {shopItem.isPilot && (<img className="w-4 h-4 image-pixelated" src="/sprites/pilotIcon.png" />)}
                {shopItem.isScientist && (<img className="w-4 h-4 image-pixelated" src="/sprites/scientistIcon.png" />)}
                {shopItem.isEngineer && (<img className="w-4 h-4 image-pixelated" src="/sprites/engineerIcon.png" />)}
            </div>
        </div>
    )
}

const ShopItem = ({
    player,
    setPlayer,
    shopItem,
    disabled = shopItem.isLocked || player.netWorth < shopItem.price || player.astronautRoomCount * player.roomSpaceCap <= player.astronauts.length
}: {
    player: Player,
    setPlayer: React.Dispatch<React.SetStateAction<Player>>,
    shopItem: ShopItem,
    disabled?: boolean,
    locked?: boolean
}) => {

    const onClick = async () => {
        const {room, slot} = getNextAvailableQuartersSlot(player);

        if (shopItem.price <= player.netWorth) {
            const placeholderId = `placeholder-${crypto.randomUUID()}`

            setPlayer((prev) => ({
                ...prev,
                netWorth: prev.netWorth - shopItem.price,
                astronauts: [...prev.astronauts,
                {
                    id: placeholderId,
                    price: shopItem.price,
                    modelUrl: shopItem.modelUrl,
                    isEngineer: shopItem.isEngineer || false,
                    isScientist: shopItem.isScientist || false,
                    isPilot: shopItem.isPilot || false,
                    lastCurrencyUpdate: new Date(Date.now()).toISOString(),
                    isGeneratingDollars: shopItem.isScientist || false,
                    dollarsPerSecond: shopItem.dollarsPerSecond || 0,
                    occupiedSlot: slot,
                    occupiedRoom: room
                }]
            }))

            try {
                const res = await fetch("/api/astronauts", {
                    method: "POST",
                    body: JSON.stringify({
                        username: player.username,
                        name: shopItem.name,
                        room: room,
                        slot: slot
                    })
                })

                if (!res.ok) throw new Error("Purchase Failed")

                const data = await res.json();
                const newAstronaut = data.newAstronaut;

                setPlayer((prev) => ({
                    ...prev,
                    astronauts: prev.astronauts.map((a) => {
                        if (a.id == placeholderId) {
                            return { ...a, id: newAstronaut.id }
                        } else {
                            return a
                        }
                    })
                }))
            } catch {
                setPlayer((prev) => ({
                    ...prev,
                    netWorth: prev.netWorth + shopItem.price,
                    astronauts: prev.astronauts.filter((a) => a.id != placeholderId)
                }))
            }
        }
    }

    return (
        <div onClick={onClick} className={`relative mr-2 shrink-0 bg-linear-to-b rounded overflow-hidden 
            h-16 flex transition duration-200 ease-in-out
            ${disabled ? "z-0 from-blue-dark to-blue-dark" :
                "from-blue-light to-blue box-shadow hover:cursor-pointer hover:to-blue-light"}`
        }>
            <div className="absolute w-full h-full rounded " />
            <div className="z-30 h-16 w-16 bg-blue-dark border-r-2 border-blue relative">
                <div className="z-10 texture geometric-texture opacity-10" />
                {shopItem.isLocked ?
                    (<ColoredSprite className="z-20 relative h-16 w-16 image-pixelated bg-blue-darkest" spriteUrl={shopItem.iconUrl} />)
                    :
                    (<img className="z-20 relative h-16 w-16 image-pixelated" src={shopItem.iconUrl} />)
                }
                <JobIndicator shopItem={shopItem} />
            </div>

            <div className="px-3 py-0.5 flex flex-col">
                <div className={`relative z-20 text-2xl leading-none ${disabled ? "" : "text-shadow"}`}> {shopItem.isLocked ? "???" : shopItem.name} </div>
                <div className="flex gap-1">
                    {Array(shopItem.rating)
                        .fill(0)
                        .map((_, index) => (

                            <img
                                key={index}
                                className="relative z-20 h-4 w-4 image-pixelated"
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
                <div className={`relative z-20 py-0.5 text-sm leading-none ${disabled ? "text-red-light text-glow-red" : "text-green-light text-glow-green"}`}> ${shopItem.price} </div>
            </div>
        </div>
    )
}

export default function Shop({ className }: { className?: string }) {
    const [player, setPlayer] = usePlayer();
    const [category, setCategory] = useState<Category>("Astronauts")
    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Shop" iconUrl="/sprites/shopIcon.png">
            <div className="relative p-4 flex gap-2">
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