import SectionCard from "./SectionCard"
import TiledSprite from "./TiledSprite"
import TopBar from "./TopBar"

export default function Launchpad({ className }: { className?: string }) {
    return (
        <SectionCard iconUrl={"/sprites/launchpadIcon.png"} className={"flex flex-col " + className} sectionName="Launchpad">
            <div className="flex-1 flex-col flex justify-between">
                <TopBar isLaunchpad={true} />
                <div className="flex-1 w-full flex flex-col items-center">
                    <div className="flex-1 w-full">

                    </div>
                    <TiledSprite tileUrl={"/sprites/grassTile.png"} className="bg-blue-darker w-full h-8 image-pixelated"></TiledSprite>
                </div>

            </div>

        </SectionCard>
    )
}