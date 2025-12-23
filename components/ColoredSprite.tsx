export default function ColoredSprite({ iconUrl, className, style }: { iconUrl: string, className?: string, style?: React.CSSProperties }) {
    return (
        <div className={`${className}`} style={
            {
                ...{
                    maskImage: `url(${iconUrl})`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskImage: `url(${iconUrl})`,
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: "contain"
                }, ...style
            }
        } />
    )
}