///this compnent is a container for shop, science, and leaderboard in smaller screens
import Shop from "./Shop";
import Science from "./Science";
import Leaderboard from "./Leaderboard";
import { useState } from "react";
import { Store, Podium, Atom } from "lucide-react";

type cards = "Shop" | "Science" | "Leaderboard"
export default function GameHub({ className, plot, setPlot }: { className?: string, plot: number, setPlot: React.Dispatch<React.SetStateAction<number>> }) {
    const [renderedCard, setRenderedCard] = useState<cards>("Shop")

    return (
        <div className={`${className}`}>
            <div className="absolute p-2 left-full flex flex-col items-center gap-3">
                <button onClick={() => setRenderedCard("Shop")} className={`${renderedCard == "Shop" ? "text-blue-light" : "hover:text-blue-light"}`}> <Store className="h-5 w-5" /> </button>
                <button onClick={() => setRenderedCard("Science")} className={`${renderedCard == "Science" ? "text-blue-light" : "hover:text-blue-light"}`}> <Atom className="h-5 w-5" /> </button>
                <button onClick={() => setRenderedCard("Leaderboard")} className={`${renderedCard == "Leaderboard" ? "text-blue-light" : "hover:text-blue-light"}`}> <Podium className="h-5 w-5" /> </button>
            </div>
            {renderedCard == "Shop" && <Shop className="w-full h-full" plot={plot} setPlot={setPlot} />}
            {renderedCard == "Science" && <Science className="w-full h-full" />}
            {renderedCard == "Leaderboard" && <Leaderboard className="w-full h-full" />}
        </div>
    )

}