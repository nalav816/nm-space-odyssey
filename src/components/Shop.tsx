import ColoredSprite from "./ColoredSprite"
import SectionCard from "./SectionCard"
import { toast } from "./Toast"
import { useState, useRef } from "react"
import { usePlayer } from "../hooks/usePlayer"
import { Player, savePlayerData } from "../services/playerService"
import { Shop as ShopType } from "../services/shopService"
import { Store } from "lucide-react"
import { Astronaut, purchaseAstronaut, isAstronaut, isScientist, isEngineer, isPilot, isVacantQuartersSpace } from "../services/astronautService"
import {
    Rocket, RocketComponent, RocketComponentName,
    createRocket, createRocketComponent, deleteRocket, deleteRocketComponent,
    isEngine, isNosecone, isControlModule, isFuelTank, validatePlacement
} from "../services/rocketService"
import { Entity, getShopIcon, getPrice, getRating, isPlaceholder } from "../services/entityService"
import { playSound } from "../services/audioSevice"

type Category = keyof ShopType;

const CategoryButton = ({ category, setCategory, active = true }: { category: Category, setCategory: () => void, active?: boolean }) => {
    return (
        <button onClick={setCategory} className={`relative rounded w-32 h-6 text-white
            text-sm transform transition duration-100 ease-in-out 
            ${active ? "bg-blue-light box-shadow" : "bg-blue-dark hover-shadow hover:cursor-pointer hover:bg-blue-light transition duration-300"}
            `}>
            <div className="relative z-40"> {category[0].toUpperCase() + category.slice(1)}  </div>
        </button>
    )
}

const JobIndicator = ({ shopItem }: { shopItem: Entity }) => {
    return (
        <div className="absolute right-0 top-0">
            <div className="absolute rounded-lg w-full h-full z-20 blur-sm bg-blue-darker/70" />
            <div className="flex flex-col p-1 z-30 relative gap-1">
                {isAstronaut(shopItem) && isPilot(shopItem as Astronaut) && (<img className="w-4 h-4 image-pixelated" src="/sprites/pilotIcon.png" />)}
                {isAstronaut(shopItem) && isScientist(shopItem as Astronaut) && (<img className="w-4 h-4 image-pixelated" src="/sprites/scientistIcon.png" />)}
                {isAstronaut(shopItem) && isEngineer(shopItem as Astronaut) && (<img className="w-4 h-4 image-pixelated" src="/sprites/engineerIcon.png" />)}
                {!isAstronaut(shopItem) && isEngine(shopItem as RocketComponent) && (<img className="w-4 h-4 image-pixelated" src="/sprites/engineIcon.png" />)}
                {!isAstronaut(shopItem) && isFuelTank(shopItem as RocketComponent) && (<img className="w-4 h-4 image-pixelated" src="/sprites/fuelTankIcon.png" />)}
                {!isAstronaut(shopItem) && isNosecone(shopItem as RocketComponent) && (<img className="w-4 h-4 image-pixelated" src="/sprites/noseconeIcon.png" />)}
                {!isAstronaut(shopItem) && isControlModule(shopItem as RocketComponent) && (<img className="w-4 h-4 image-pixelated" src="/sprites/controlModuleIcon.png" />)}
            </div>
        </div>
    )
}

const ShopItem = ({
    player,
    setPlayer,
    shopItem,
    plot,
    setPlot,
    unknown = false,
    disabled = unknown || player.netWorth < getPrice(shopItem) 
}: {
    player: Player,
    setPlayer: React.Dispatch<React.SetStateAction<Player>>,
    shopItem: Entity,
    plot: number,
    setPlot: React.Dispatch<React.SetStateAction<number>>,
    disabled?: boolean,
    unknown?: boolean
}) => {
    const debounce = useRef<null | NodeJS.Timeout>(null)

    const removePlaceholderComponent = (player: Player) => {
        let placeholderComponent: RocketComponent | undefined;
        player.rockets.forEach((r, _) => {
            r.components.forEach((c, _) => {
                if (isPlaceholder(c)) placeholderComponent = c
            })
        })
        return placeholderComponent ? deleteRocketComponent(player, placeholderComponent.id).player : player
    }

    const onClick = async () => {
        if (!disabled && !debounce.current) {
            if (isAstronaut(shopItem)) {
                if (isVacantQuartersSpace(player)){
                    const result = purchaseAstronaut(player, shopItem.name as any);
                    if (result) {
                        setPlayer(result.player)
                        savePlayerData(result.player)
                        playSound("astronautSpawn")
                    }
                } else {
                    toast({title: "Purchase Error", description: "Astronaut's Quarters are currently full. Fire a astronaut to create more space."})
                }

            } else {
                const placeholder = player.rockets[plot - 1].components.find((c, _) => isPlaceholder(c))!
                const res = validatePlacement(placeholder, player.rockets[plot - 1], player.plotHeightCap)
                if (res.isValid) {
                    const { player: newPlayer } = createRocketComponent(player, shopItem.name as RocketComponentName, plot)
                    const { player: newerPlayer } = createRocketComponent(newPlayer, shopItem.name as RocketComponentName, plot, true)

                    setPlayer(newerPlayer)
                    savePlayerData(newerPlayer)
                    playSound("partSpawn")
                } else {
                    toast({ title: "Purchase Error", description: res.errorMessage })
                }
            }
            debounce.current = setTimeout(() => {
                debounce.current = null
            }, 250)
        }
    }

    const onMouseEnter = () => {
        if (!isAstronaut(shopItem)) {
            const { player: newPlayer } = createRocketComponent(player, shopItem.name as RocketComponentName, plot, true)
            setPlayer(newPlayer)
        }
    }

    const onMouseLeave = () => {
        if (!isAstronaut(shopItem)) {
            setPlayer(removePlaceholderComponent(player))
        }
    }

    return (
        <div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} onClick={onClick} className={`relative mr-2 shrink-0 bg-linear-to-b rounded overflow-hidden 
            h-16 flex transition duration-200 ease-in-out
            ${disabled ? "z-0 from-blue-dark to-blue-dark" :
                "from-blue-light to-blue box-shadow hover:cursor-pointer hover:to-blue-light"}`
        }>
            <div className="absolute w-full h-full rounded " />
            <div className={`z-30 h-16 min-w-17 bg-blue-dark border-r-2 border-blue relative`}>
                <div className="z-10 texture geometric-texture opacity-10" />
                {unknown ?
                    (<ColoredSprite color="blue-darker" className="z-20 relative h-16 w-16 image-pixelated" spriteUrl={getShopIcon(shopItem)} />)
                    :
                    (<img className="z-20 relative h-16 w-16 image-pixelated" src={getShopIcon(shopItem)} />)
                }
                <JobIndicator shopItem={shopItem} />
            </div>

            <div className="px-3 py-0.5 flex flex-col">
                <div className={`relative z-20 text-xl leading-none truncate w-48`}> {unknown ? "???" : shopItem.name} </div>
                <div className="flex gap-1">
                    {Array(getRating(shopItem))
                        .fill(0)
                        .map((_, index) => (

                            <img
                                key={index}
                                className="relative z-20 h-4 w-4 image-pixelated"
                                src="/sprites/star.png"
                                alt={`star-${index}`}
                            />


                        ))}
                    {Array(5 - getRating(shopItem))
                        .fill(0)
                        .map((_, index) => (
                            <ColoredSprite key={index}
                                color="blue-darker"
                                className="h-4 w-4 image-pixelated"
                                spriteUrl="/sprites/star.png"
                            />
                        ))}
                </div>
                <div className={`relative z-20 text-sm ${disabled ? "text-red-light text-glow-red" : "text-green-light text-glow-green"}`}> ${getPrice(shopItem)} </div>
            </div>
        </div>
    )
}

export default function Shop(
    { className, plot, setPlot }:
        { className: string, plot: number, setPlot: React.Dispatch<React.SetStateAction<number>> }
) {
    const [player, setPlayer] = usePlayer();
    const [category, setCategory] = useState<Category>("astronauts")

    return (
        <SectionCard icon={Store} className={"flex flex-col " + className} sectionName="Shop">
            <div className="relative p-4 flex gap-2">
                <CategoryButton setCategory={() => {
                    playSound("uiClick", .4)
                    setCategory("astronauts")
                }} category={"astronauts"} active={category == "astronauts"} />
                <CategoryButton setCategory={() => {
                    playSound("uiClick", .4)
                    setCategory("rocketry")
                }} category={"rocketry"} active={category == "rocketry"} />
            </div>

            <div className="flex items-stretch overflow-auto min-h-0 flex-1 mx-4 pb-2   mb-4 justify-start flex-col gap-4 scrollbar-custom">
                {player!.shop[category].map((shopItem: Entity, i: number) => (
                    <ShopItem
                        player={player!}
                        setPlayer={setPlayer}
                        key={i}
                        shopItem={shopItem}
                        plot={plot}
                        setPlot={setPlot}
                    />
                ))}
            </div>
        </SectionCard>
    )
}