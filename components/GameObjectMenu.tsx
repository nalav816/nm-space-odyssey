

export default function GameObjectMenu({ isRocketObject = false, onActionClick, onSellClick }:
    { isRocketObject?: boolean, onActionClick?: () => void, onSellClick?: () => void }) {
    const sellButtonName = isRocketObject ? "Deconstruct" : "Fire"
    const actionButtonName = isRocketObject ? "idk yet" : "Assign Ship"

    return (
        <div className="flex flex-col absolute -top-8 left-full ml-1 p-2 gap-2 z-50">
            <div className="absolute top-0 left-0 w-full h-full blur-md bg-blue-dark/90" />
            <button onClick={onActionClick}
                className="relative animate-floatIn hover:cursor-pointer hover:to-blue text-xs w-24 h-5 bg-radial to-blue-dark from-blue rounded shadow-md z-50 transform transition duration-200 ease-in-out hover:scale-105 border border-dashed border-blue"
            >
                {actionButtonName}
            </button>
            <button onClick={onSellClick}
                className="relative animate-floatIn hover:cursor-pointer hover:to-red text-xs w-24 h-5 bg-radial to-red-dark from-red rounded shadow-md z-50 transform transition duration-200 ease-in-out hover:scale-105 border border-dashed border-red"
                style={{animationDuration: ".3s"}}
            >
                {sellButtonName}
            </button>
        </div>
    )
}