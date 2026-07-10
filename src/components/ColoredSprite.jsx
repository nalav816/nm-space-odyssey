export default function ColoredSprite({ spriteUrl, className, style }) {
    return (
        <div className={`${className}`} style={
            {
                ...{
                    maskImage: `url(${spriteUrl})`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskImage: `url(${spriteUrl})`,
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: "contain"
                }, ...style
            }
        } />
    )
}