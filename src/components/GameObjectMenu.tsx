

const MenuButton = ({ className, name, onClick }: { className?: string, name: string, onClick?: () => any }) => {
    return (
        <button
            onClick={onClick}
            className={`relative animate-floatIn hover:cursor-pointer 
                text-xs w-20 h-5 bg-radial rounded shadow-md 
                z-50 transform transition duration-200 ease-in-out 
                hover:scale-105 border border-dashed ${className}`}
        >
            <div className="texture geometric-texture opacity-10" />
            {name}
        </button>
    )
}

export default function GameObjectMenu(
    {
        isRocketObject = false,
        isXOffsetRight = false,
        isActionButton = false,
        isSellButton = true,
        onActionClick,
        onSellClick
    }
        :
        {
            isRocketObject?: boolean,
            isXOffsetRight?: boolean,
            isActionButton?: boolean,
            isSellButton?: boolean,
            onActionClick?: () => void,
            onSellClick?: () => void
        }
) {
    const sellButtonName = isRocketObject ? "Deconstruct" : "Fire"
    const actionButtonName = isRocketObject ? "Configure" : "Assign Ship"

    return (
        <div className={`flex flex-col items-center absolute -top-1/4 -translate-y-1/2 ${isXOffsetRight ? "right-full" : "left-full"} ml-1 p-2 gap-2 z-50`}>
            <div className="absolute top-0 left-0 w-full h-full blur-xl bg-blue-lightest/25" />
            {isActionButton && <MenuButton className= "border-blue-light hover:to-blue-light to-blue from-blue" name={actionButtonName} onClick={onActionClick}/>}
            {isSellButton && <MenuButton className= "[animation-duration:300ms] border-red-light hover:to-red-light to-red from-red" name={sellButtonName} onClick={onSellClick}/>}
            
        </div>
    )
}