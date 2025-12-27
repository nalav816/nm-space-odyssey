import SectionCard from "./SectionCard"

export default function Leaderboard({className} : {className?: string}){
    const leaderboardData = [
        { name: "Alex Johnson", amount: 5000 },
        { name: "Sam Williams", amount: 4750 },
        { name: "Jordan Lee", amount: 4500 },
        { name: "Casey Davis", amount: 4250 },
        { name: "Morgan Brown", amount: 4000 },
        { name: "Taylor Martinez", amount: 3750 },
        { name: "Riley Garcia", amount: 3500 },
        { name: "Jamie Rodriguez", amount: 3250 },
        { name: "Blake Anderson", amount: 3000 },
        { name: "Quinn Taylor", amount: 2750 },
    ]

    return (
        <SectionCard className = {`flex flex-col ${className}`} sectionName = "Leaderboard" iconUrl="/sprites/leaderboardIcon.png">
            <div className="flex-1 min-h-0 flex flex-col my-2 px-4 gap-1 overflow-y-auto scrollbar-custom mr-4">
                {leaderboardData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-md text-blue-lightest">
                        <span>{index + 1}. {entry.name}</span>
                        <span className="text-green text-glow-green">${entry.amount.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </SectionCard>
    )
}