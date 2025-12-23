"use client"
import SectionCard from "./SectionCard"
import TiledSprite from "./TiledSprite"
import TopBar from "./TopBar"
import ColoredSprite from "./ColoredSprite"
import { useState, useEffect } from "react"

type Size = {
    width: number,
    height: number
}

const RocketPlatform = ({ rocketSprite }: { rocketSprite: string }) => {
    const [rocketSize, setRocketSize] = useState<Size>({ width: 1, height: 1 });
    //we can use number here cause tiles are square
    const [platformTileSize, setPlatformTileSize] = useState<number>(1)

    useEffect(() => {
        const rocketImg = new Image();
        const tileImg = new Image()
        rocketImg.src = rocketSprite;
        //multiply by two cause all the art in this game is scaled double
        rocketImg.onload = () => setRocketSize({ width: rocketImg.width * 2, height: rocketImg.height * 2 });
        tileImg.src = "/sprites/platformTile.png"
        tileImg.onload = () => setPlatformTileSize(tileImg.width * 2);
    }, [])

    //calc how many horizontal and vertical platform tiles we need to fit the rocket
    const minXTileToFill = Math.ceil(rocketSize.width / platformTileSize);
    const minYTileToFill = Math.ceil(rocketSize.height / platformTileSize);

    return (
        <div className="flex flex-col items-end relative">
            {new Array(minYTileToFill).fill(0).map((_, i) => (
                i % 3 == 0 && i != 0 ? (
                    <div className="flex" key={i}>
                        {new Array(minXTileToFill / 2 - 1).fill(0).map((_, i) => (
                            <ColoredSprite className="h-8 w-8 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformBridgeTile.png" />
                        ))}
                        <ColoredSprite className="h-8 w-8 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformBridgeRightTile.png" />
                        <ColoredSprite className="h-8 w-8 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformVertTile.png" />
                    </div>
                ) : (
                    <ColoredSprite className="h-8 w-8 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformVertTile.png" key={i} />
                )
            ))}

            <ColoredSprite className="h-8 w-8 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformBottomVertTile.png" />

            <div className="flex">
                <ColoredSprite className="h-8 w-8 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformLeftTile.png" />
                {new Array(minXTileToFill - 1).fill(0).map((_, i) =>
                (
                    <ColoredSprite className="h-8 w-8 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformTile.png" key={i} />
                )
                )}
                <ColoredSprite className="h-8 w-16 bg-blue-dark image-pixelated" spriteUrl="/sprites/platformRightTile.png" />
            </div>

            <img className={`absolute bottom-8 right-1/2 translate-x-1/2 image-pixelated`} src={rocketSprite} style={
                {
                    height: `${rocketSize.height}px`,
                    width: `${rocketSize.width}px`
                }
            } />
        </div>
    )
}

export default function Launchpad({ className }: { className?: string }) {
    return (
        <SectionCard iconUrl={"/sprites/launchpadIcon.png"} className={"flex flex-col " + className} sectionName="Launchpad">
            <div className="flex-1 min-h-0 flex-col flex justify-between">
                <TopBar isLaunchpad={true} />
                <div className="flex-1 min-h-0 w-full flex flex-col items-center">
                    <div className="flex-1 w-full min-h-0 px-4">
                        <div className="h-full flex min-h-0 flex-col-reverse items-center overflow-auto w-full scrollbar-custom ">
                            <RocketPlatform rocketSprite="/sprites/bigRed.png" />

                        </div>
                    </div>

                    <TiledSprite tileUrl={"/sprites/grassTile.png"} className="bg-blue-darker w-full h-8 image-pixelated"></TiledSprite>
                </div>

            </div>

        </SectionCard>
    )
}