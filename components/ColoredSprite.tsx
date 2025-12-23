export function ColoredSprite({iconUrl, className} : {iconUrl:string, className?:string}) {
    return (
        <div className = {`${className}`} style={
            {
                maskImage: `url(${iconUrl})`,
                maskRepeat: "no-repeat",
                maskSize: "contain",
                WebkitMaskImage: `url(${iconUrl})`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskSize: "contain"
            } 
        }/>
    )
}