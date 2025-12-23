"use client"
import TintedSprite from "./TintedSprite"
import { useState, useEffect } from "react"
import GameObjectMenu from "./GameObjectMenu"

const DRAG_CANCEL_KEYBIND = "C"
const DragType = {
    //employee drag trigger mechanisms
    //Triggred by action button
    ActionDrag: "ActionDrag",
    //Triggered by press and hold
    HoldDrag: "HoldDrag"
}

type DragType = typeof DragType[keyof typeof DragType]

const DragIndicator = ({dragType} : {dragType:DragType}) => {

}

export type EmployeeData = {
    name: string,
    rating: number,
    modelUrl: string,
    shopIconUrl: string,
}

export function Employee({ employeeData }: { employeeData: EmployeeData }) {
    const MAX_TINT_INTENSITY = .2
    const [tintAnim, setTintAnim] = useState<number>(0)
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false)
    const [dragType, setDragType] = useState<DragType>(DragType.ActionDrag)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

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
            if (e.key.toLowerCase() == DRAG_CANCEL_KEYBIND.toLowerCase() && isBeingDragged) {
                setIsBeingDragged(false)
            }
        }
        document.addEventListener("keypress", onKeyPressed)
        return () => document.removeEventListener("keypress", onKeyPressed)
    }, [isBeingDragged])

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY })
        }

        document.addEventListener("mousemove", onMouseMove)
        return () => document.removeEventListener("mousemove", onMouseMove)
    }, [])

    return (
        <div className="relative">
            {isBeingDragged ?
                (
                    <TintedSprite
                        className="z-50 image-pixelated fixed cursor-grabbing"
                        style={{
                            top: `${mouse.y - 30}px`,
                            left: `${mouse.x - 10}px`
                        }}
                        spriteUrl={employeeData.modelUrl}
                        tintIntensity={0}
                    />
                ) : (
                    <TintedSprite
                        className="hover:cursor-pointer image-pixelated text-white"
                        spriteUrl={employeeData.modelUrl}
                        tintIntensity={tintAnim <= .5 ? tintAnim * MAX_TINT_INTENSITY * 2 : MAX_TINT_INTENSITY - ((tintAnim - .5) * 2) * MAX_TINT_INTENSITY}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                    />
                )}
            {isSelected &&
                <GameObjectMenu onActionClick={onActionClick} />
            }
        </div>

    )
}