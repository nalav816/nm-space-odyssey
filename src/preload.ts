const { contextBridge, ipcRenderer } = require('electron')
import { Player } from "./services/playerService";

contextBridge.exposeInMainWorld("data", {
    savePlayerData: async (data: Player, closeWindow:boolean = false) => ipcRenderer.invoke('savePlayerData', data, closeWindow),
    loadPlayerData: async () : Promise<Player> => ipcRenderer.invoke('loadPlayerData')
})

contextBridge.exposeInMainWorld("appEvents", {
    onAppClose: (callback: () => any) => {
        ipcRenderer.on("onAppClose", callback)
        return () => {
            ipcRenderer.removeListener("onAppClose", callback)
        }
    }
})
