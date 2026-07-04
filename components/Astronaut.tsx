"use client"
import { motion } from "motion/react"
import TintedSprite from "./TintedSprite"
import { useState, useEffect, useRef } from "react"
import GameObjectMenu from "./GameObjectMenu"
import type { Astronaut } from "@/views/astronaut"
import type { Player } from "@/views/player"
import { usePlayer } from "@/hooks/usePlayer"

const IdleProductionHandler = ({ astronautData, setPlayer }: { astronautData: Astronaut, setPlayer: React.Dispatch<React.SetStateAction<Player>> }) => {
    const dollarGenerationInterval = useRef<NodeJS.Timeout | null>(null)
    const [moneyEarnedParticles, setMoneyEarnedParticles] = useState(new Array());

    const handleParticleDeletion = (particleId: string) => {
        setMoneyEarnedParticles(prev => (
            prev.filter(v => v.id != particleId)
        ))
    }

    useEffect(() => {
        const handlePayout = () => {
            setPlayer(prev => ({
                ...prev,
                netWorth: prev.netWorth + astronautData.dollarsPerSecond
            }))
            setMoneyEarnedParticles(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    val: astronautData.dollarsPerSecond,
                    x: -10 + Math.random() * 20,
                    y: -140 + Math.random() * -20
                }
            ])
        }

        const initialTimeout = setTimeout(() => {
            handlePayout()

            dollarGenerationInterval.current = setInterval(() => {
                handlePayout()
            }, 1000)
        }, (Date.now() - new Date(astronautData.lastCurrencyUpdate).getTime()) % 1000)

        return () => {
            clearTimeout(initialTimeout)
            if (astronautData.isScientist && dollarGenerationInterval.current) clearInterval(dollarGenerationInterval.current)
        }
    }, [])

    return (
        <motion.div className="absolute -top-16 w-24 flex justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{
                duration: Math.random() * 1 + 2,
                delay: Math.random() * 1,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <TintedSprite scale={2} className="image-glow-yellow relative z-20 image-pixelated" spriteUrl="/sprites/dollarSign.png" />
            <motion.img
                animate={{ rotate: 360 }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute z-10 w-24 -top-8 opacity-80 left-0 h-24" src={"/imgs/flare.png"}
            />

            {moneyEarnedParticles.map((p, _) => (
                <motion.div
                    key={p.id}
                    className="absolute -top-5 text-green-light text-glow-green"
                    initial={{
                        x: 0,
                        y: 0
                    }}
                    animate={{
                        x: p.x,
                        y: p.y,
                        opacity: 0,
                        scale: 0
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeOut"
                    }}
                    onAnimationComplete={() => handleParticleDeletion(p.id)}

                >
                    +{p.val}
                </motion.div>
            ))

            }


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
        <div className="absolute top-full left-0 w-full pt-2 flex justify-center">
            <div className="relative shrink-0 text-xs text-center z-20">
                {dragType == DragType.ActionDrag ? (<div> Press The <span className="text-blue-light"> {DRAG_CANCEL_KEYBIND} <br /> Key </span>  To Cancel </div>) :
                    (<div> Release Hold <br /> To Cancel </div>)}
                <div className="absolute bg-blue-light/30 blur-lg h-full w-full top-0 z-10" />
            </div>
        </div>
    )
}

export function Astronaut({ astronautData }: { astronautData: Astronaut }) {
    const [player, setPlayer] = usePlayer();
    const MAX_TINT_INTENSITY = .2
    const [tintAnim, setTintAnim] = useState<number>(0)
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false)
    const [dragType, setDragType] = useState<DragType>(DragType.ActionDrag)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const dragTimer = useRef<NodeJS.Timeout | null>(null)

    const onMouseEnter = () => {
        setIsMouseOver(true)
    }

    const onMouseLeave = () => {
        setIsMouseOver(false)
    }

    const onClick = () => {
        setIsSelected((prev) => !prev)
    }

    const onActionClick = () => {
        setDragType(DragType.ActionDrag)
        setIsBeingDragged(true)
    }

    const onSellClick = async () => {
        setPlayer((prev) => ({
            ...prev,
            ...{
                astronauts: prev.astronauts.filter((a) => a.id != astronautData.id),
                netWorth: prev.netWorth + astronautData.price
            }
        }))

        try {
            const res = await fetch("/api/astronauts", {
                method: "DELETE",
                body: JSON.stringify({
                    username: player.username,
                    id: astronautData.id,
                })
            })

            if (!res.ok) throw new Error("Astronaut could not be sold.")
        } catch {
            setPlayer((prev) => ({
                ...prev,
                ...{
                    astronauts: [...prev.astronauts, astronautData],
                    netWorth: prev.netWorth - astronautData.price
                }
            }))
        }
    }

    useEffect(() => {
        let frame: number;

        const animate = () => {
            setTintAnim((prev) => {
                const goal = isMouseOver && !isSelected ? 1 : 0
                const delta = .006
                if (prev + delta <= goal) {
                    return prev + delta
                } else {
                    return isSelected ? .5 : 0
                }
            })

            frame = requestAnimationFrame(animate)
        }

        animate()
        return () => cancelAnimationFrame(frame)
    }, [isMouseOver, isSelected])

    useEffect(() => {
        const onClickAnywhere = (event: MouseEvent) => {
            if (isSelected) {
                setIsSelected(false)
            }
        }

        document.addEventListener("click", onClickAnywhere)
        return () => document.removeEventListener("click", onClickAnywhere)
    }, [isSelected])

    useEffect(() => {
        const onKeyPressed = (e: KeyboardEvent) => {
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
        const onMouseMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY })
        }

        document.addEventListener("mousemove", onMouseMove)
        return () => document.removeEventListener("mousemove", onMouseMove)
    }, [])

    return (
        <div className="flex flex-col items-center gap-8 relative">
            <div className={`z-50 fixed ${isBeingDragged ? "" : "hidden pointer-events-none"}`}
                style={{
                    top: `${mouse.y - 30}px`,
                    left: `${mouse.x - 10}px`
                }}
            >

                <TintedSprite
                    className="image-pixelated cursor-grabbing"
                    spriteUrl={astronautData.modelUrl}
                    tintIntensity={0}
                />

                <DragIndicator dragType={dragType} />
            </div>

            {astronautData.isScientist && !isBeingDragged && <IdleProductionHandler astronautData={astronautData} setPlayer={setPlayer} />}

            <TintedSprite
                className={`relative z-10 hover:cursor-pointer image-pixelated text-white ${isBeingDragged ? "hidden pointer-events-none" : ""}`}
                spriteUrl={astronautData.modelUrl}
                tintIntensity={tintAnim <= .5 ? tintAnim * MAX_TINT_INTENSITY * 2 : MAX_TINT_INTENSITY - ((tintAnim - .5) * 2) * MAX_TINT_INTENSITY}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            />

            {isSelected &&
                <GameObjectMenu onActionClick={onActionClick} onSellClick={onSellClick} />
            }
        </div>

    )
}