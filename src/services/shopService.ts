import { Player } from "./playerService";

export interface ShopItem  {
    name: string;
    rating: number;
    price: number
    iconUrl: string;
    modelUrl: string;
    isLocked: boolean;
    dollarsPerSecond: number;
    isEngineer: boolean;
    isScientist: boolean;
    isPilot: boolean;
}

export interface Shop {
    astronauts: ShopItem[];
    rocketry: ShopItem[];
}

function sortShopItems(a: ShopItem, b: ShopItem) {
    if (a.rating !== b.rating) {
        return a.rating - b.rating
    }

    return a.price - b.price
}

function getPlayerShop(player: Player) {

}