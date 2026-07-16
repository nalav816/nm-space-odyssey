import ColoredSprite  from "./ColoredSprite";

export default function TiledSprite({className, tileUrl, tileHeight=32, tileWidth=32} : {className?:string, tileUrl:string, tileHeight?:number, tileWidth?:number}) {
    return (
        <ColoredSprite className={className} spriteUrl={tileUrl}
            style = {
                {
                    WebkitMaskRepeat: "repeat",
                    maskRepeat: "repeat",
                    WebkitMaskSize: `${tileWidth}px ${tileHeight}px`,
                    maskSize: `${tileWidth}px ${tileHeight}px`,
                    WebkitMaskPosition: "0",
                    maskPosition: "0"
                }
            }
        />
    )
}