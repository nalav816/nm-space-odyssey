import type { Player } from "./services/playerService";

export {};

declare global {
  interface Window {
    data: {
      loadPlayerData: () => Promise<Player>;
      savePlayerData: (player: Player) => Promise<void>;
    };
  }
}