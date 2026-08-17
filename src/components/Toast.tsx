import { toast as sonnerToast } from "sonner";
import { useEffect } from "react";
import { CircleX } from "lucide-react"

export type ToastParams = {
    title?: string,
    description?: string
}

export function toast(params: ToastParams) {
    return sonnerToast.custom(() => (
        <Toast title={params?.title} description={params?.description}/>
    ))
}

export default function Toast({ title = "Title", description} : {title?:string, description?:string}) {
    useEffect(() => {
        const spawnNoise = new Audio("/audio/toastError.mp3")
        spawnNoise.play()
    }, [])

    return (
        <div className="border-blue-dark border flex box-shadow popup-radial-gradient relative rounded w-80 min-h-8 text-white font-jaro">
            <div className="texture opacity-5 z-10" />
            <div className="flex items-center justify-center rounded-l relative min-w-12 bg-blue z-30" >
                <div className="texture geometric-texture opacity-5 z-10"></div>
                <CircleX />
            </div>
            <div className="px-3 py-2 min-w-0">
                <div className="leading-tight text-sm relative z-20"> {title} </div>
                {description && (<div className="whitespace-pre-line leading-tight relative text-xs text-blue-light"> {description} </div>)}

            </div>

        </div>)
}