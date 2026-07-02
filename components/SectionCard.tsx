export default function SectionCard({ children, className, sectionName, iconUrl = "/sprites/placeholder.png" } : {children?: React.ReactNode, className?: string, sectionName?: string, iconUrl?: string}){
    return (
        <div className = {"relative box-shadow bg-blue rounded-md z-10 " + className}>
            <div className = "rounded-md texture metallic-texture opacity-60 z-20" />
            <div className ="z-30 relative w-full h-12 rounded-t bg-blue-dark shadow-md p-4 gap-2 flex items-center">
                <div className = "texture geometric-texture opacity-10" />
                {
                    /* 
                    <img className="h-8 w-8 image-pixelated" src = {iconUrl} />
                    */
                }
                <div className = "text-md"> {sectionName} </div>
            </div>
            {children}
        </div>
    )
}