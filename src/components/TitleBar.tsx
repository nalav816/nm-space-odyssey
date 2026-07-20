import { Minimize, Maximize, X } from "lucide-react"


export default function TitleBar() {
    return (
         <div className="titlebar flex justify-center items-center px-4 py-2 soft-box-shadow card-radial-gradient relative border-b-2 border-blue-darker border-dashed w-full z-30">
                <div className="texture opacity-5" />
                <div className="text-sm"> <span className="text-blue-light">N&M</span> Space <span className="text-blue-lightest">Odyssey</span> </div>
                

        </div>
    )
}