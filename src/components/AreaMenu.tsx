import ColoredSprite from "./ColoredSprite";
import { useEffect, useRef } from "react";

const AreaButton = ({ number, setArea, isActive } : {number: number, setArea: React.Dispatch<React.SetStateAction<number>>, isActive:boolean}) => {
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (isActive && button.current) {
            button.current.scrollIntoView({
                behavior: "smooth"
            })
        }

    }, [isActive])

    return (
        <button
            className={`relative
        border border-dashed text-sm text-white h-8 w-8 rounded
        ${isActive ? "bg-blue-light border-blue" : "bg-blue border-blue-dark"}`
            }
            onClick={() => setArea(number)}
            ref={button}
        >
            <div className="w-full h-full texture geometric-texture opacity-10" />
            {number}
        </button>
    )
}

export default function AreaMenu(
    {
        items = 0,
        itemCapacity = 0,
        currArea = 1,
        areaCount = 0,
        isLaunchpad = false,
        setArea
    } :

    {
        items: number,
        itemCapacity: number,
        currArea: number,
        areaCount: number,
        isLaunchpad: boolean,
        setArea: React.Dispatch<React.SetStateAction<number>>
    }
) {
    const areaName = isLaunchpad ? "Plot" : "Room"
    const itemIconUrl = isLaunchpad ? "/sprites/stackIcon.png" : "/sprites/astronautIcon.png";

    return (
        <div className="relative z-40 px-4 py-2 w-full flex flex-col">
            <div className="gap-4 flex items-center">
                <div className="text-md"> {areaName + " " + currArea}  </div>
                <div className="flex gap-1">
                    <ColoredSprite className="bg-blue-lightest h-4 w-4 image-pixelated" spriteUrl={itemIconUrl} />
                    <div className="text-sm"> {items} / {itemCapacity} </div>
                </div>
            </div>

            <div className="border-b-2 border-blue-dark">
                <div className="flex flex-wrap mt-2 pb-2 gap-2 min-h-0 max-h-10 overflow-y-scroll scrollbar-custom ">
                    {Array.from({ length: areaCount }).map((_, i) => (
                        <AreaButton key={i} setArea={setArea} number={i + 1} isActive={i + 1 == currArea} />
                    ))}
                </div>
            </div>
        </div>
    );
}