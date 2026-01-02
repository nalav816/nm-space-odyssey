import { Astronauts } from "@/lib/prisma-client/client";

export type ShopItem = {
    name: string;
    rating: number;
    price: number
    iconUrl: string;
    modelUrl: string;
    isLocked: boolean;
    isEngineer?: boolean;
    isScientist?: boolean;
    isPilot?: boolean;
}

export type Shop = {
    Astronauts: ShopItem[];
    Rockets: ShopItem[];
}

export function getShopItemView(shopItemEntry: Astronauts) {
    return {
        name: shopItemEntry.name,
        rating: shopItemEntry.rating,
        price: shopItemEntry.price,
        iconUrl: shopItemEntry.shopIconUrl,
        modelUrl: shopItemEntry.modelUrl,
        isEngineer: shopItemEntry.isEngineer,
        isScientist: shopItemEntry.isScientist,
        isPilot: shopItemEntry.isPilot,
        //placeholder value, we don't computer this here
        isLocked: true
    }
}

export function sortShopItems(a: ShopItem, b: ShopItem) {
    if (a.rating !== b.rating) {
        return a.rating - b.rating
    }

    return a.price - b.price
}