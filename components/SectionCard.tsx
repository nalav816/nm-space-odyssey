export default function SectionCard({ children, className, sectionName, iconUrl = "/sprites/placeholder.png" } : {children?: React.ReactNode, className?: string, sectionName?: string, iconUrl?: string}){
    return (
        <div className = {"h-64 w-32 shadow-md section-card rounded-md border-blue-dark border-2 border-dashed " + className}>
            <div className ="w-full h-12 rounded-t bg-blue-darkest shadow-md p-4 gap-2 flex items-center">
                <img className="h-8 w-8 image-pixelated" src = {iconUrl} />
                <div className = "text-lg text-glow-blue"> {sectionName} </div>
            </div>
            {children}
        </div>
    )
}