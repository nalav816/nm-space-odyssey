
import type { LucideIcon } from "lucide-react"
import { FileQuestionMark } from "lucide-react"

export default function SectionCard({ children, className, sectionName, icon: Icon = FileQuestionMark} : {children?: React.ReactNode, className?: string, sectionName?: string, icon?: LucideIcon}){
    return (
        <div className = {"relative box-shadow bg-blue rounded-md z-10 " + className}>
            <div className = "rounded-md texture metallic-texture opacity-60 z-20" />
            <div className ="z-30 relative w-full h-12 rounded-t bg-blue-dark p-4 gap-1 flex items-center">
                <div className = "texture geometric-texture opacity-10" />
                <Icon className="h-5 w-5"/>
                <div className = "text-md"> {sectionName} </div>
            </div>
            {children}
        </div>
    )
}