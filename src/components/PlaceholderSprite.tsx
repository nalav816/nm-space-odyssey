import TintedSprite from "./TintedSprite";
import { useEffect } from "react";
import { useAnimationControls } from "motion/react";

export default function PlaceholderSprite({ spriteUrl }: { spriteUrl: string }) {
    const controls = useAnimationControls();

    useEffect(() => {
        async function animate() {
            controls.set({
                opacity: 0,
                scale: 0,
                filter: "blur(10px)"
            })

            await controls.start({
                opacity: .5,
                scale: 1,
                filter: "blur(0px",
                transition: {
                    duration: .15,
                    ease: "easeOut"
                }
            })

            controls.start({
                opacity: [.5, .8, .5],
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }
            })
        }

        animate()
    }, [controls])

    return (
        <TintedSprite className={"opacity-50"}
            tintColor="white"
            tintIntensity={.1}
            spriteUrl={spriteUrl}
            animate={controls}
        />
    )
}