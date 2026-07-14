const { contextBridge, ipcRenderer } = require('electron')
import { Player } from "./services/playerService";

contextBridge.exposeInMainWorld("data", {
    savePlayerData: async (data: Player) => ipcRenderer.invoke('savePlayerData', data),
    loadPlayerData: async () : Promise<Player> => ipcRenderer.invoke('loadPlayerData')
})
