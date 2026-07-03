import ColoredSprite from "./ColoredSprite";
import SectionCard from "./SectionCard"

const ResearchIcon = () => {
    return (
        <div className=" border-[1px] border-dashed border-blue-dark relative h-10 w-10 flex transform transition duration-200 ease-in-out hover:cursor-pointer hover:to-blue items-center justify-center rounded bg-linear-to-b from-blue to-blue-dark shadow-md">
            <div className="w-full h-full texture geometric-texture opacity-10"/>
            <img className="h-4 w-4 image-pixelated" src="/sprites/placeholder.png"/>
        </div>
    );
}

const ResearchSection = ({ name, className, maxItemCount=-1 }: { name: string, className?: string, maxItemCount?: number}) => {
    const itemCount = 4
    const items = new Array(itemCount).fill(0);

    return (
        <div className={`border-2 border-dashed border-blue-dark relative rounded z-30 card-radial-gradient w-full min-h-0 min-w-0 flex flex-col ${className}`}>
            <div className ="texture opacity-5"/>
            <div className="relative z-10 w-full px-4 py-2"> {name + " "} <span className="text-blue text-xs">  ({itemCount + (maxItemCount > 0 ? "/" + maxItemCount : "")}) </span> </div>
            <div className="relative z-10 mx-4 flex flex-1 overflow-auto min-h-0 gap-2 flex-wrap mb-2 scrollbar-custom ">
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
                    <div className="h-full rounded-b absolute z-40 bg-blue-darker w-full flex flex-col justify-center items-center">
                        <div className="texture locks-texture z-0 opacity-2"/>
                        <div className="relative z-10 text-center text-white"> 
                            <div className="flex items-center gap-1">
                                <div> Hire A <span className="text-purple"> Scientist </span> </div>
                                <ColoredSprite className="h-4 w-4 image-pixelated bg-purple" spriteUrl="/sprites/scientistIcon.png"/>
                            </div>
                            <div> To Unlock Science </div>
                        </div>
                    </div>
                )}

                <div className="h-full w-full flex flex-col p-2 gap-2">
                    <ResearchSection className="basis-1/3 border-b border-blue-dark" name="Current Research" maxItemCount={7}/>
                    <ResearchSection className="basis-2/3 border-b border-blue-dark" name="Available Research" />
                </div>
            </div>
        </SectionCard>
    )
}