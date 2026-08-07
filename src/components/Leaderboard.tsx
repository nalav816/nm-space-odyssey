import SectionCard from "./SectionCard"
import { Podium } from "lucide-react"

export default function Leaderboard({className} : {className?:string}){
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
        <SectionCard icon={Podium} className = {`flex flex-col ${className}`} sectionName = "Leaderboard">
            <div className="flex-1 min-h-0 flex flex-col my-2 pl-4 px-2 gap-2 overflow-y-auto scrollbar-custom mr-4">
                {leaderboardData.map((entry, index) => (
                    <div key={index} className="p-2 bg-linear-to-b from-blue-light to-blue rounded box-shadow flex items-center justify-between text-sm text-white">
                        <span className="relative z-20">{index + 1}. {entry.name}</span>
                        <span className="relative z-30 text-green-light text-glow-green">${entry.amount.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </SectionCard>
    )
}