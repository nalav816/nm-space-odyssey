import { Player } from "./playerService";
import { AstronautName } from "./astronautService";
import { RocketComponentName } from "./rocketService";

export interface ShopItem  {
    name: AstronautName | RocketComponentName;
    rating: number;
    price: number
    isLocked: boolean;
    dollarsPerSecond?: number;
    isEngineer?: boolean;
    isScientist?: boolean;
    isPilot?: boolean;
    isEngine?: boolean;
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