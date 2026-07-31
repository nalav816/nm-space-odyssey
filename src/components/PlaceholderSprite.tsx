import TintedSprite from "./TintedSprite";
import { useEffect } from "react";
import { useAnimationControls } from "motion/react";

export default function PlaceholderSprite({ spriteUrl, isPlaceable = true}: { spriteUrl: string, isPlaceable?: boolean}) {
    const controls = useAnimationControls();

    useEffect(() => {
        async function animate() {
            controls.set({
                opacity: 0,
                y: -30,
                filter: "blur(10px)"
            })

            await controls.start({
                opacity: .5,
                y: 0,
                filter: "blur(0px",
                transition: {
                    duration: .15,
                    ease: "easeOut"
                }
            })

            controls.start({
                opacity: [.5, .9, .5],
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }
            })
        }

        animate()
    }, [controls])

    return (
        <TintedSprite className="opacity-80"
            tintColor={isPlaceable ? "green-light" : "red-light"}
            tintIntensity={.3}
            spriteUrl={spriteUrl}
            animate={controls}
            style={{originY: 1}}
        />
    )
}