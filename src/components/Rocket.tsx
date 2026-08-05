import TintedSprite from "./TintedSprite"
import PlaceholderSprite from "./PlaceholderSprite"
import SelectableSprite from "./SelectableSprite"
import { Rocket as RocketType, RocketComponent as RocketComponentType, deleteRocketComponent, isValidPlacement, isSellable, isEngine, deleteRocket } from "../services/rocketService"
import { getModel, isPlaceholder } from "../services/entityService"
import { useState } from "react"
import GameObjectMenu from "./GameObjectMenu"
import useSelect from "../hooks/useSelect"
import { Player, savePlayerData } from "../services/playerService"
import { usePlayer } from "../hooks/usePlayer"

const RocketComponent = ({ rocket, component, player, setPlayer }: { rocket: RocketType, component: RocketComponentType, player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>> }) => {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isSelected, setIsSelected] = useSelect(isMouseOver)
    const componentIndex = rocket.components.findIndex((c, _) => c.id == component.id)
    const isLast = componentIndex == rocket.components.length - 1
    const isPlaceholderAbove = isLast ? false : isPlaceholder(rocket.components[componentIndex + 1])

    const onSellClick = () => {
        if (isSellable(component, rocket)) {
            const newPlayer = deleteRocketComponent(player, component.id).player
            setPlayer(newPlayer)
            savePlayerData(newPlayer)
        } else {
            //will error handle in another ticket
            console.log("cannot be sold")
        }
    }

    const onSellAllClick = () => {
        const newPlayer = deleteRocket(player, rocket.id).player
        setPlayer(newPlayer)
        savePlayerData(newPlayer)
    }

    return isPlaceholder(component) ? (
        <PlaceholderSprite isPlaceable={isValidPlacement(component, rocket, player.plotHeightCap)} spriteUrl={getModel(component)} />
    ) : (
        <div>
            {!isLast &&
                (isPlaceholderAbove ?
                    <PlaceholderSprite isPlaceable={isValidPlacement(rocket.components[componentIndex + 1], rocket, player.plotHeightCap)} spriteUrl="/sprites/coupler.png" /> :
                    <TintedSprite tintIntensity={0} spriteUrl="/sprites/coupler.png" />)
            }
            <div className="relative">
                <SelectableSprite
                    isSelected={isSelected}
                    isMouseOver={isMouseOver}
                    setIsMouseOver={setIsMouseOver}
                    setIsSelected={setIsSelected}
                    spriteUrl={getModel(component)}
                />
                {isSelected &&
                    <GameObjectMenu
                        isSellButton={!isEngine(component)}
                        onSellClick={onSellClick}
                        isSellAllButton={isEngine(component)}
                        onSellAllClick={onSellAllClick}
                        isRocketObject={true}
                        isXOffsetRight={true}
                    />}

            </div>
        </div>

    )
}

export default function Rocket({ rocket }: { rocket: RocketType }) {
    const [player, setPlayer] = usePlayer()

    return (
        <div className="flex flex-col-reverse absolute bottom-8 left-8">
            {rocket.components.map((c, i) => {
                return (
                    <div key={i} className="flex flex-col">
                        <RocketComponent rocket={rocket} player={player} setPlayer={setPlayer} component={c} />
                    </div>
                )
            })}
        </div>
    )
}