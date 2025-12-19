import SectionCard from "./SectionCard"

const ResearchSection = ({ name, className }: { name: string, className?: string }) => {
    const items = new Array(8).fill(0);

    return (
        <div className={`w-full flex flex-col ${className}`}>
            <div className="w-full px-4 py-2"> {name} </div>
            <div className="px-4 flex flex-1 overflow-auto min-h-0 gap-2 flex-wrap mb-2">
                {items.map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded bg-blue">

                    </div>
                ))}
            </div>

        </div>
    )
}

export default function Science({ className }: { className?: string }) {
    const available = true;

    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Science" iconUrl="/sprites/scienceIcon.png">
            <div className="flex-1 min-h-0 flex flex-col w-full relative">
                {!available && (
                    <div className="h-full absolute bg-blue-darkest/60 w-full flex justify-center items-center">
                        <div className="text-center text-white"> Hire A Researcher <br /> And Keep Them In Employee's Quarters <br /> To Unlock Science </div>
                    </div>
                )}

                <div className="h-full w-full flex flex-col">
                    <ResearchSection className="flex-1 min-h-0 border-b border-blue-dark" name="Current Research" />
                    <ResearchSection className="flex-1 min-h-0 border-b border-blue-dark" name="Queued Research" />
                    <ResearchSection className="flex-1 min-h-0" name="Available Research" />
                </div>
            </div>
        </SectionCard>
    )
}