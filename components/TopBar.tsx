import ColoredSprite from "./ColoredSprite";
import { useEffect, useRef } from "react";

const RoomButton = ({ number, setRoom, isActive }: { number: number, setRoom: any, isActive: boolean }) => {
    const button = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (isActive) {
            button.current?.scrollIntoView({
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
            onClick={() => setRoom(number)}
            ref = {button}
           >
            <div className="w-full h-full texture geometric-texture opacity-10" />
            {number}
        </button>
    )
}

export default function TopBar(
    {
        items = 0,
        itemCapacity = 0,
        currRoom = 1,
        roomCount = 0,
        isLaunchpad = false,
        setRoom = (a: number) => 1 + 2
    }
        :
        {
            items?: number,
            itemCapacity?: number,
            currRoom?: number,
            roomCount?: number,
            isLaunchpad?: boolean,
            setRoom?: any
        }
) {
    const roomName = isLaunchpad ? "Plot" : "Room"
    const itemIconUrl = isLaunchpad ? "/sprites/shipIcon.png" : "/sprites/astronautIcon.png";

    return (
        <div className="relative z-40 px-4 py-2 w-full flex flex-col">
            <div className="gap-4 flex items-center">
                <div className="text-md"> {roomName + " " + currRoom}  </div>
                <div className="flex gap-1">
                    <ColoredSprite className="bg-blue-lightest h-4 w-4 image-pixelated" spriteUrl={itemIconUrl} />
                    <div className="text-sm"> {items} / {itemCapacity} </div>
                </div>
            </div>

            <div className="flex flex-wrap mt-2 pb-2 gap-2 min-h-0 max-h-10 overflow-y-scroll scrollbar-custom ">
                {Array.from({ length: roomCount }).map((_, i) => (
                    <RoomButton key={i} setRoom={setRoom} number={i + 1} isActive={i + 1 == currRoom} />
                ))}
            </div>
        </div>
    );
}