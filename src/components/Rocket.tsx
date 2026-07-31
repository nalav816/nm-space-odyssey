import TintedSprite from "./TintedSprite"
import PlaceholderSprite from "./PlaceholderSprite"
import SelectableSprite from "./SelectableSprite"
import { Rocket as RocketType, RocketComponent as RocketComponentType, deleteRocketComponent } from "../services/rocketService"
import { getModel, isPlaceholder } from "../services/entityService"
import { useState } from "react"
import GameObjectMenu from "./GameObjectMenu"
import useSelect from "../hooks/useSelect"
import { Player } from "../services/playerService"
import { usePlayer } from "../hooks/usePlayer"

const RocketComponent = ({ component, player, setPlayer }: { component: RocketComponentType, player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>> }) => {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isSelected, setIsSelected] = useSelect(isMouseOver)

    const onSellClick = () => {
        setPlayer(deleteRocketComponent(player, component.id).player)
    }
    
    return isPlaceholder(component) ? (
        <PlaceholderSprite spriteUrl={getModel(component)} />
    ) : (
        <div className="relative">
            <SelectableSprite
                isSelected={isSelected}
                isMouseOver= {isMouseOver}
                setIsMouseOver= {setIsMouseOver}
                setIsSelected={setIsSelected}
                spriteUrl={getModel(component)}
            />
            {isSelected && <GameObjectMenu onSellClick={onSellClick} isRocketObject={true} isXOffsetRight={true} /> }

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
                        {i < rocket.components.length - 1 && (
                            <TintedSprite tintIntensity={0} spriteUrl="/sprites/coupler.png" />
                        )}
                        <RocketComponent player={player} setPlayer={setPlayer} component={c} />
                    </div>
                )
            })}
        </div>
    )
}