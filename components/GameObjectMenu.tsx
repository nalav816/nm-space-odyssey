

export default function GameObjectMenu({isRocketObject = false} : {isRocketObject?:boolean}) {
    const sellButtonName = isRocketObject ? "Deconstruct" : "Fire"
    const actionButtonName = isRocketObject ? "idk yet" : "Assign Ship"

    return (
        <div className="flex flex-col absolute -top-6 left-full w-full px-2 gap-2">
            <button className="hover:cursor-pointer hover:to-blue text-xs w-24 h-5 bg-radial to-blue-dark from-blue rounded shadow-md z-30 transform transition duration-200 ease-in-out hover:scale-105 border border-dashed border-blue">
                {actionButtonName}
            </button>
            <button className="hover:cursor-pointer hover:to-red text-xs w-24 h-5 bg-radial to-red-dark from-red rounded shadow-md z-30 transform transition duration-200 ease-in-out hover:scale-105 border border-dashed border-red">
                {sellButtonName}
            </button>
        </div>
    )
}