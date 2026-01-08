import ColoredSprite from "./ColoredSprite";
import SectionCard from "./SectionCard"
import type { Player } from "@/views/player"

const ResearchIcon = () => {
    return (
        <div className="relative h-8 w-8 flex transform transition duration-200 ease-in-out hover:cursor-pointer hover:to-blue items-center justify-center rounded bg-linear-to-b from-blue to-blue-dark shadow-md">
            <div className="absolute noise-texture w-full h-full rounded z-30" />
            <img className="h-4 w-4 image-pixelated relative z-20" src="/sprites/placeholder.png"/>
        </div>
    );
}

const ResearchSection = ({ name, className, maxItemCount=-1 }: { name: string, className?: string, maxItemCount?: number}) => {
    const itemCount = 4
    const items = new Array(itemCount).fill(0);

    return (
        <div className={`w-full flex flex-col ${className}`}>
            <div className="w-full px-4 py-2"> {name + " "} <span className="text-blue text-xs">  ({itemCount + (maxItemCount > 0 ? "/" + maxItemCount : "")}) </span> </div>
            <div className="mx-4 flex flex-1 overflow-auto min-h-0 gap-2 flex-wrap mb-2 scrollbar-custom ">
                {items.map((_, i) => (
                    <ResearchIcon key={i}/>
                ))}
            </div>

        </div>
    )
}

export default function Science({ player, className }: { player: Player, className?: string }) {
    const available = player.astronauts.some((a) => a.isScientist);

    return (
        <SectionCard className={"flex flex-col " + className} sectionName="Science" iconUrl="/sprites/scienceIcon.png">
            <div className="flex-1 min-h-0 flex flex-col w-full relative">
                {!available && (
                    <div className="h-full z-50 absolute bg-blue-darkest/60 w-full flex flex-col gap-2 justify-center items-center backdrop-blur-md">
                        <ColoredSprite className="h-16 w-16 image-pixelated bg-white" spriteUrl="/sprites/scienceLockedIcon.png" />
                        <div className="text-center text-white"> 
                            <div className="flex items-center gap-1">
                                <div> Hire A <span className="text-purple"> Scientist </span> </div>
                                <ColoredSprite className="h-4 w-4 image-pixelated bg-purple" spriteUrl="/sprites/scientistIcon.png"/>
                            </div>
                            <div> To Unlock Science </div>
                        </div>
                    </div>
                )}

                <div className="relative h-full w-full flex flex-col">
                    <ResearchSection className="flex-1 min-h-0 border-b border-blue-dark" name="Current Research" maxItemCount={7}/>
                    <ResearchSection className="flex-1 min-h-0 border-b border-blue-dark" name="Queued Research" />
                    <ResearchSection className="flex-1 min-h-0" name="Available Research" />
                </div>
            </div>
        </SectionCard>
    )
}