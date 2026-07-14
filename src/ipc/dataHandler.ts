import { ipcMain } from "electron";
import { writeFile, readFile, rename } from "fs/promises"
import { app } from "electron";
import { DEFAULT_PLAYER_DATA } from "../services/playerService";
import path from "path";

const tempSaveFile = path.join(app.getPath("userData"), "save.json.tmp")
const saveFile = path.join(app.getPath("userData"), "save.json")

console.log(saveFile)

ipcMain.handle('savePlayerData', async (_, data) => {
    try {
        await writeFile(tempSaveFile, JSON.stringify(data), "utf8")
        await rename(tempSaveFile, saveFile)
    } catch (e: any) {
        console.log(e)
        throw Error("Save failed.")
    }
})

ipcMain.handle('loadPlayerData', async () => {
    try {
        const data = await readFile(saveFile, "utf8")
        return JSON.parse(data)
    } catch (e: any) {
        
        if (e.code == "ENOENT") {
            console.log("ran")
            return DEFAULT_PLAYER_DATA
        }

        throw Error("Data could not be loaded.")
    }
})