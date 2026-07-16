import { writeFile, readFile, rename } from "fs/promises"
import { app } from "electron";
import { Player } from "../services/playerService";
import plrData from "../data/player.json";
import path from "path";

const tempSaveFile = path.join(app.getPath("userData"), "save.json.tmp")
const saveFile = path.join(app.getPath("userData"), "save.json")

export async function savePlayerData (data:Player) {
    try {
        await writeFile(tempSaveFile, JSON.stringify(data), "utf8")
        await rename(tempSaveFile, saveFile)
        console.log("Data saved!")
    } catch (e: any) {
        console.log(e)
        throw Error("Save failed.")
    }
}

export async function loadPlayerData () {
    try {
        const data = await readFile(saveFile, "utf8")
        return JSON.parse(data)
    } catch (e: any) {
        
        if (e.code == "ENOENT") {
            return plrData.DEFAULT_PLAYER_DATA
        }

        throw Error("Data could not be loaded.")
    }
}