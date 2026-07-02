import ColoredSprite from "./ColoredSprite";

const RoomButton = ({ number, isActive }: { number: number, isActive: boolean }) => {
    return (
        <button className={`relative
        border-[1px] border-dashed text-sm text-white h-8 w-8 rounded
        ${isActive ? "bg-blue-light border-blue" : "bg-blue border-blue-dark"}`
        }>
            <div className="w-full h-full texture geometric-texture opacity-10"/>
            {number}
        </button>
    )
}

export default function TopBar({ items = 0, itemCapacity = 0, isLaunchpad = false }: { items?: number, itemCapacity?: number, isLaunchpad?: boolean }) {
    const roomName = isLaunchpad ? "Plot" : "Room"
    const roomCount = 25
    const currRoom = 1
    const itemIconUrl = isLaunchpad ? "/sprites/shipIcon.png" : "/sprites/astronautIcon.png";

    return (
        <div className="px-4 py-2 w-full flex flex-col min-h-0 max-h-20">
            <div className="gap-4 flex items-center">
                <div className="text-md"> {roomName + " " + currRoom}  </div>
                <div className="flex gap-1">
                    <ColoredSprite className="bg-blue-lightest h-4 w-4 image-pixelated" spriteUrl={itemIconUrl} />
                    <div className="text-sm"> {items} / {itemCapacity} </div>
                </div>
            </div>

            <div className="flex flex-wrap py-2 gap-2 min-h-0 overflow-hidden">
                {Array.from({ length: roomCount }).map((_, i) => (
                    <RoomButton key={i} number={i + 1} isActive={i+1 == currRoom} />
                ))}
            </div>
        </div>
    );
}