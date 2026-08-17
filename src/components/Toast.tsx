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
        <div className="box-shadow bg-linear-to-b from-blue-light to-blue flex relative rounded w-80 min-h-8 text-white font-jaro">
            <div className="texture metallic-texture opacity-60 z-10" />
            <div className="border-r-2 border-blue-light flex items-center justify-center rounded-l relative min-w-12 min-h-8 bg-blue z-30" >
                <div className="texture geometric-texture opacity-5 z-10"></div>
                <CircleX className="text-blue-light"/>
            </div>
            <div className="px-3 py-2">
                <div className="leading-tight relative z-20"> {title} </div>
                {description && (<div className="whitespace-pre-line leading-tight relative text-xs"> {description} </div>)}

            </div>

        </div>)
}