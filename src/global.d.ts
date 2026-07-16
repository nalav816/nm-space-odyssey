import type { Player } from "./services/playerService";

export {};

declare global {
  interface Window {
    data: {
      loadPlayerData: () => Promise<Player>;
      savePlayerData: (player: Player, closeWindow?:boolean) => Promise<void>;
    };
    appEvents: {
      onAppClose: (callback: () => any) => () => void
    }
  }
}