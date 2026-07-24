import ColoredSprite from "./ColoredSprite"
import SectionCard from "./SectionCard"
import { useState } from "react"
import { usePlayer } from "../hooks/usePlayer"
import { Player, savePlayerData } from "../services/playerService"
import { getNextAvailableQuartersSlot } from "./AstronautQuarters"
import { Shop as ShopType, ShopItem as ShopItemType } from "../services/shopService"
import { AstronautName, getShopIcon as getAstronautShopIcon} from "../services/astronautService"
import { getShopIcon as getRocketComponentShopIcon, RocketComponentName } from "../services/rocketService"

type Category = keyof ShopType;

//helper function which easily tells us if shop item is astronaut or rocket component
function isAstronaut (shopItem: ShopItemType){
    return shopItem.isEngineer || shopItem.isScientist || shopItem.isPilot
}

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

const JobIndicator = ({ shopItem }: { shopItem: ShopItemType }) => {
    return (
        <div className="absolute right-0 top-0">
            <div className="absolute rounded-lg w-full h-full z-20 blur-sm bg-blue-darker/70" />
            <div className="flex flex-col p-1 z-30 relative gap-1">
                {shopItem.isPilot && (<img className="w-4 h-4 image-pixelated" src="/sprites/pilotIcon.png" />)}
                {shopItem.isScientist && (<img className="w-4 h-4 image-pixelated" src="/sprites/scientistIcon.png" />)}
                {shopItem.isEngineer && (<img className="w-4 h-4 image-pixelated" src="/sprites/engineerIcon.png" />)}
                {shopItem.isEngine && (<img className="w-4 h-4 image-pixelated" src="/sprites/engineIcon.png" />)}
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
    shopItem: ShopItemType,
    disabled?: boolean
}) => {

    const onClick = async () => {
        if (shopItem.isEngineer || shopItem.isPilot || shopItem.isScientist) {
            const { room, slot } = getNextAvailableQuartersSlot(player);

            if (shopItem.price <= player.netWorth) {
                const id = crypto.randomUUID()
                const newPlayer: Player = {
                    ...player,
                    netWorth: player.netWorth - shopItem.price,
                    astronauts: [...player.astronauts,
                    {
                        id: id,
                        name: shopItem.name,
                        lastCurrencyUpdate: Date.now(),
                        isGeneratingDollars: shopItem.isScientist,
                        dollarsPerSecond: shopItem.dollarsPerSecond,
                        occupiedSlot: slot,
                        occupiedRoom: room
                    }],
                }

                setPlayer(newPlayer)
                savePlayerData(newPlayer)
            }
        } else {


        }
    }

    const iconUrl = isAstronaut(shopItem) ? getAstronautShopIcon(shopItem.name as AstronautName) : getRocketComponentShopIcon(shopItem.name as RocketComponentName)

    return (
        <div onClick={onClick} className={`relative mr-2 shrink-0 bg-linear-to-b rounded overflow-hidden 
            h-16 flex transition duration-200 ease-in-out
            ${disabled ? "z-0 from-blue-dark to-blue-dark" :
                "from-blue-light to-blue box-shadow hover:cursor-pointer hover:to-blue-light"}`
        }>
            <div className="absolute w-full h-full rounded " />
            <div className="z-30 h-16 w-16 bg-blue-dark  relative">
                <div className="z-10 texture geometric-texture opacity-10" />
                {shopItem.isLocked ?
                    (<ColoredSprite className="z-20 relative h-16 w-16 image-pixelated bg-blue-darkest" spriteUrl={iconUrl} />)
                    :
                    (<img className="z-20 relative h-16 w-16 image-pixelated" src={iconUrl} />)
                }
                <JobIndicator shopItem={shopItem} />
            </div>

            <div className="px-3 py-0.5 flex flex-col">
                <div className={`relative z-20 text-xl leading-none`}> {shopItem.isLocked ? "???" : shopItem.name} </div>
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
                                color="blue-darker"
                                className="h-4 w-4 image-pixelated"
                                spriteUrl="/sprites/star.png"
                            />
                        ))}
                </div>
                <div className={`relative z-20 mt-auto pb-1.5 text-sm leading-none ${disabled ? "text-red-light text-glow-red" : "text-green-light text-glow-green"}`}> ${shopItem.price} </div>
            </div>
        </div>
    )
}

export default function Shop({ className }: { className: string }) {
    const [player, setPlayer] = usePlayer();
    const [category, setCategory] = useState<Category>("astronauts")

    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Shop" iconUrl="/sprites/shopIcon.png">
            <div className="relative p-4 flex gap-2">
                <CategoryButton setCategory={() => setCategory("astronauts")} category={"astronauts"} active={category == "astronauts"} />
                <CategoryButton setCategory={() => setCategory("rocketry")} category={"rocketry"} active={category == "rocketry"} />
            </div>

            <div className="flex items-stretch overflow-auto min-h-0 flex-1 mx-4 mb-4 justify-start flex-col gap-4 scrollbar-custom">
                {player!.shop[category].map((shopItem: ShopItemType, i: number) => (
                    <ShopItem player={player!} setPlayer={setPlayer} key={i} shopItem={shopItem} />
                ))}
            </div>
        </SectionCard>
    )
}