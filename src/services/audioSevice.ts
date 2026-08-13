
type SoundName =
    | "selection"
    | "earthClick"
    | "toastError"
    | "moneyGenerated"
    | "uiClick"

const sounds: Record<SoundName, HTMLAudioElement> = {
    selection: new Audio("/audio/selection.mp3"),
    earthClick: new Audio("/audio/earthClick.mp3"),
    toastError: new Audio("/audio/toastError.mp3"),
    moneyGenerated: new Audio("/audio/moneyGenerated.mp3"),
    uiClick: new Audio("/audio/uiClick.mp3"),
}

Object.values(sounds).forEach(audio => {
    audio.preload = "auto"
    audio.load()
})

export function playSound(name: SoundName, volume: number = 1) {
    const audio = sounds[name]

    audio.volume= volume
    audio.currentTime = 0
    audio.play()
}