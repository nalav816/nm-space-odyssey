export default function TopBar({ items = 0, itemCapacity = 0, isLaunchpad = false } : {items?:number, itemCapacity?:number, isLaunchpad?:boolean}) {
    const roomName = isLaunchpad ? "Plot" : "Room"
    const roomCount = 2
    const currRoom = 1
    const itemIconUrl = isLaunchpad ? "/sprites/placeholder.png" : "/sprites/employeeIcon.png";

    return (
        <div className="w-full flex justify-between py-2 px-4 items-center">
            <div className="flex w-16 gap-2">
                <img className="h-4 w-4 image-pixelated" src={itemIconUrl}/>
                <div className="text-sm"> {items} / {itemCapacity} </div>
            </div>
            <div className="basis-2/4 gap-4 flex justify-center">
                <button className="hover:text-blue-lightest hover:cursor-pointer"> &lt; </button>
                <div className="text-md"> {roomName} <span className="text-blue">{" " + currRoom} / {roomCount}</span> </div>
                <button className="hover:text-blue-lightest hover:cursor-pointer"> &gt; </button>
            </div>
            <div className="flex justify-end gap-2 w-16 items-center">
                <button className="h-4 w-4 bg-blue rounded-md shadow hover:cursor-pointer hover:bg-blue-light transition duration-200 ease-in-out">
                    <img className="h-full w-full image-pixelated" src="/sprites/plusIcon.png" />
                </button>

                <div className="text-sm"> {roomName}s </div>
            </div>
        </div>
    );
}