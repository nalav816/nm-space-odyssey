import TintedSprite from "./TintedSprite"

export default function Earth({ }) {
    return (
        <button className="relative p-1 rounded-full border-blue-dark border-dashed border-2 bg-blue-darker">
            <TintedSprite className="relative z-20" tintIntensity={0} spriteUrl="/sprites/earth.png" />

        </button>

    )
}