import { Minimize, Maximize, X } from "lucide-react"


export default function TitleBar() {
    return (
         <div className="titlebar flex justify-between items-center px-4 py-2 soft-box-shadow card-radial-gradient relative border-b-2 border-blue-darker border-dashed w-full z-30">
                <div className="texture opacity-5" />
                <div className="text-sm"> <span className="text-blue-light">N&M</span> Space <span className="text-blue-lightest">Odyssey</span> </div>
                <div className="flex gap-2 items-center text-white"> 

                    <Minimize className="h-4"/>
                    <Maximize className="h-4"/>
                    <X className="h-4"/>
                </div>

        </div>
    )
}