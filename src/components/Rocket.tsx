import TintedSprite from "./TintedSprite"

export default function Rocket({}) {

    return (
        <div className="flex flex-col-reverse absolute bottom-8 left-8">
            <TintedSprite tintIntensity={0} spriteUrl="/sprites/makeshiftEngine.png"/> 
            <TintedSprite tintIntensity={0} spriteUrl="/sprites/coupler.png"/> 
            <TintedSprite tintIntensity={0} spriteUrl="/sprites/cardboardFuelTank.png"/> 
            <TintedSprite tintIntensity={0} spriteUrl="/sprites/coupler.png"/> 
            <TintedSprite tintIntensity={0} spriteUrl="/sprites/trashCommandModule.png"/> 
            <TintedSprite tintIntensity={0} spriteUrl="/sprites/coupler.png"/> 
            <TintedSprite  tintIntensity={0} spriteUrl="/sprites/nosecone.png"/> 
        </div>
    )
}