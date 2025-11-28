export default function SectionCard({ children, className, sectionName } : {children?: React.ReactNode, className?: string, sectionName?: string}){
    return (
        <div className = {"h-64 w-32 shadow-md section-card rounded-md border-blue-dark border-3 border-dashed " + className}>
            <div className ="w-full h-12 rounded-t bg-blue-darkest shadow-md p-4 flex items-center">
                <div className = "text-xl"> {sectionName} </div>
            </div>
            {children}
        </div>
    )
}