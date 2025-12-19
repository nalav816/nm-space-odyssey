import SectionCard from "./SectionCard"

const ResearchIcon = () => {
    return (
        <div className="h-8 w-8 flex transform transition duration-200 ease-in-out hover:-translate-y-1 items-center justify-center rounded bg-linear-to-b from-blue to-blue-dark shadow-md">
            <img className="h-4 w-4 image-pixelated" src="/sprites/placeholder.png"/>
        </div>
    );
}

const ResearchSection = ({ name, className, maxItemCount=-1 }: { name: string, className?: string, maxItemCount?: number}) => {
    const itemCount = 4
    const items = new Array(itemCount).fill(0);

    return (
        <div className={`w-full flex flex-col ${className}`}>
            <div className="w-full px-4 py-2"> {name + " "} <span className="text-blue text-xs">  ({itemCount + (maxItemCount > 0 ? "/" + maxItemCount : "")}) </span> </div>
            <div className="px-4 mr-2 pt-1 flex flex-1 overflow-auto min-h-0 gap-2 flex-wrap mb-2 scrollbar-custom ">
                {items.map((_, i) => (
                    <ResearchIcon key={i}/>
                ))}
            </div>

        </div>
    )
}

export default function Science({ className }: { className?: string }) {
    const available = false;

    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Science" iconUrl="/sprites/scienceIcon.png">
            <div className="flex-1 min-h-0 flex flex-col w-full relative">
                {!available && (
                    <div className="h-full absolute bg-blue-darkest/60 w-full flex justify-center items-center backdrop-blur-sm">
                        <div className="text-center text-white"> Hire A Researcher <br /> To Unlock Science </div>
                    </div>
                )}

                <div className="h-full w-full flex flex-col">
                    <ResearchSection className="flex-1 min-h-0 border-b border-blue-dark" name="Current Research" maxItemCount={7}/>
                    <ResearchSection className="flex-1 min-h-0 border-b border-blue-dark" name="Queued Research" />
                    <ResearchSection className="flex-1 min-h-0" name="Available Research" />
                </div>
            </div>
        </SectionCard>
    )
}