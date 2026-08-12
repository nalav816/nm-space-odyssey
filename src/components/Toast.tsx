import { toast as sonnerToast } from "sonner";
import { useEffect } from "react";
import { CircleX } from "lucide-react"

export function toast() {
    return sonnerToast.custom(() => (
        <Toast />
    ))
}

export default function Toast({ }) {
    const title = "Error"
    const description = "This part could not be sold."

    useEffect(() => {
        const spawnNoise = new Audio("/audio/toastError.mp3")
        spawnNoise.play()
    }, [])

    return (
        <div className="border-blue border box-shadow bg-linear-to-b from-blue to-blue-dark flex relative rounded min-w-80 min-h-8 text-white font-jaro">
            <div className="texture opacity-5 z-10" />
            <div className="flex items-center justify-center rounded-l relative w-12 min-h-8 bg-blue-dark border-r-2 border-blue z-30" >
                <div className="texture geometric-texture opacity-5 z-10"></div>
                <CircleX />
            </div>
            <div className="px-3 py-2">
                <div className="leading-tight relative"> {title} </div>
                <div className="leading-tight relative text-xs text-blue-light"> {description} </div>

            </div>

        </div>)
}