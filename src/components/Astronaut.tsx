import { motion } from "motion/react"
import TintedSprite from "./TintedSprite"
import { useState, useEffect, useRef, useContext } from "react"
import { usePlayer } from "../hooks/usePlayer"
import { useDollarParticle } from "../hooks/useDollarParticle"
import GameObjectMenu from "./GameObjectMenu"
import { savePlayerData } from "../services/playerService"
import { Player } from "../services/playerService"
import { Astronaut as AstronautType } from "../services/astronautService"
import { getDollarsPerSecond, isScientist } from "../services/astronautService"
import { getPrice, getModel } from "../services/entityService"
import { GameContext } from "../context/GameProvider"
import { createPortal } from "react-dom"

const IdleProductionHandler = ({ astronaut, setPlayer }: { astronaut: AstronautType, setPlayer: React.Dispatch<React.SetStateAction<Player>> }) => {
    const { particles, addParticle } = useDollarParticle()
    const [setOnGameTick, _] = useContext(GameContext)!
    const floatDelay = useRef(Math.random() * 1)
    const floatDuration = useRef(Math.random() * 1 + 2)

    useEffect(() => {
        const handlePayoutEffect = () => {
            addParticle({
                value: getDollarsPerSecond(astronaut),
                originX: 0,
                originY: 0,
                driftX: -10 + Math.random() * 20,
                driftY: -140 + Math.random() * -20,
                duration: Math.random() * .5 + 3,
            })
        }

        setOnGameTick(prev => ([
            ...prev,
            handlePayoutEffect
        ]))

        return () => setOnGameTick(prev => prev.filter(callback => callback !== handlePayoutEffect))
    }, [addParticle, astronaut, setOnGameTick])

    return (
        <motion.div className="absolute -top-16 w-24 flex justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{
                duration: floatDuration.current,
                delay: floatDelay.current,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <TintedSprite tintIntensity={0} className="image-glow-yellow relative z-20" spriteUrl="/sprites/dollarSign.png" />
            <motion.img
                draggable={false}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute z-10 w-24 -top-8 opacity-80 left-0 h-24" src={"/imgs/flare.png"}
            />

            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-green-light text-glow-green"
                    initial={{
                        x: p.originX,
                        y: p.originY,
                        opacity: 1,
                        scale: 1,
                    }}
                    animate={{
                        x: p.originX + p.driftX,
                        y: p.originY + p.driftY,
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{
                        duration: p.duration,
                        ease: "easeOut"
                    }}

                >
                    +{p.value}
                </motion.div>
            ))}


        </motion.div>
    )
}

const DRAG_CANCEL_KEYBIND = "C"

const DragType = {
    //employee drag trigger mechanisms
    //Triggred by action button
    ActionDrag: "ActionDrag",
    //Triggered by press and hold
    HoldDrag: "HoldDrag"
}

type DragType = typeof DragType[keyof typeof DragType]

const DragIndicator = ({ dragType }: { dragType: DragType }) => {
    return (
        <div className="absolute top-full left-0 max-w-full pt-2 flex justify-center">
            <div className="relative shrink-0 text-xs text-white text-center z-20">
                {dragType == DragType.ActionDrag ? (<div> Press The <span className="text-blue-light"> {DRAG_CANCEL_KEYBIND} <br /> Key </span>  To Cancel </div>) :
                    (<div> Release Hold <br /> To Cancel </div>)}
                <div className="absolute bg-blue-light/30 blur-lg h-full w-full top-0 z-10" />
            </div>
        </div>
    )
}

export default function Astronaut({ astronaut }: { astronaut: AstronautType }) {
    const [player, setPlayer] = usePlayer();
    const MAX_TINT_INTENSITY = .2
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [isBeingDragged, setIsBeingDragged] = useState(false)
    const [dragType, setDragType] = useState(DragType.ActionDrag)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const dragTimer = useRef<null | NodeJS.Timeout>(null)
    const selectionTimer = useRef<null | NodeJS.Timeout>(null)

    const onMouseEnter = () => {
        setIsMouseOver(true)
    }

    const onMouseLeave = () => {
        setIsMouseOver(false)
    }

    const onClick = () => {
        if (!selectionTimer.current) {
            setIsSelected((prev) => !prev)
            selectionTimer.current = setTimeout(() => {
                selectionTimer.current = null
            }, 50)
        }

    }

    const onActionClick = () => {
        setDragType(DragType.ActionDrag)
        setIsBeingDragged(true)
    }

    const onSellClick = async () => {
        const newPlayer: Player = {
            ...player!,
            ...{
                astronauts: player!.astronauts.filter((a: AstronautType) => a.id != astronaut.id),
                netWorth: player!.netWorth + getPrice(astronaut)
            }
        }
        setPlayer!(newPlayer)
        savePlayerData(newPlayer)
    }

    useEffect(() => {
        const onClickAnywhere = (event: any) => {
            if (isSelected && !isMouseOver) {
                setIsSelected(false)
            }
        }

        document.addEventListener("click", onClickAnywhere)
        return () => document.removeEventListener("click", onClickAnywhere)
    }, [isSelected, isMouseOver])

    useEffect(() => {
        const onKeyPressed = (e: any) => {
            if (e.key.toLowerCase() == DRAG_CANCEL_KEYBIND.toLowerCase() && isBeingDragged && dragType == DragType.ActionDrag) {
                setIsBeingDragged(false)
            }
        }

        const onMouseDown = () => {
            if (!isBeingDragged && isMouseOver) {
                dragTimer.current = setTimeout(() => {
                    if (isMouseOver) {
                        setDragType(DragType.HoldDrag)
                        setIsBeingDragged(true)
                        setIsSelected(false)
                    }
                }, 250)
            }
        }

        const onMouseUp = () => {
            if (dragTimer.current) clearTimeout(dragTimer.current)
            if (isBeingDragged && dragType == DragType.HoldDrag) setIsBeingDragged(false)
        }

        document.addEventListener("keypress", onKeyPressed)
        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("mouseup", onMouseUp)

        return () => {
            if (dragTimer.current) clearTimeout(dragTimer.current)
            document.removeEventListener("keypress", onKeyPressed)
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mouseup", onMouseUp)
        }
    }, [isBeingDragged, isMouseOver])

    useEffect(() => {
        const onMouseMove = (e: any) => {
            setMouse({ x: e.clientX, y: e.clientY })
        }

        document.addEventListener("mousemove", onMouseMove)
        return () => document.removeEventListener("mousemove", onMouseMove)
    }, [])


    return (
        <div className="flex flex-col items-center gap-8 relative">
            {createPortal(<div className={`min-w-0 z-50 fixed ${isBeingDragged ? "" : "hidden pointer-events-none"}`}
                style={{
                    top: `${mouse.y - 30}px`,
                    left: `${mouse.x - 10}px`
                }}
            >

                <TintedSprite
                    className="image-pixelated cursor-grabbing"
                    spriteUrl={getModel(astronaut)}
                    tintIntensity={0}
                />

                <DragIndicator dragType={dragType} />
            </div>, document.body)}

            {isScientist(astronaut) && !isBeingDragged && <IdleProductionHandler astronaut={astronaut} setPlayer={setPlayer} />}

            <TintedSprite
                className={`relative z-30 hover:cursor-pointer image-pixelated text-white ${isBeingDragged ? "hidden pointer-events-none" : ""}`}
                spriteUrl={getModel(astronaut)}
                tintColor="white"
                tintIntensity={isSelected ? MAX_TINT_INTENSITY : 0}
                tintAnimate={isMouseOver && !isSelected ? {
                    opacity: ["0%", (MAX_TINT_INTENSITY * 100) + "%", "0%"]
                } : {}}
                tintTransition={isMouseOver && !isSelected ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                } : {}}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />

            {isSelected &&
                <GameObjectMenu isActionButton={true} isXOffsetRight={astronaut.occupiedSlot == player.roomSpaceCap || astronaut.occupiedSlot == player.roomSpaceCap - 1} onActionClick={onActionClick} onSellClick={onSellClick} />
            }
        </div>

    )
}