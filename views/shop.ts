import { Astronauts } from "@/lib/prisma-client/client";

export type ShopItem = {
    name: string;
    rating: number;
    price: number
    iconUrl: string;
    isLocked: boolean;
    isEngineer?: boolean;
    isResearcher?: boolean;
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
        isEngineer: shopItemEntry.isEngineer,
        isResearcher: shopItemEntry.isResearcher,
        isPilot: shopItemEntry.isPilot,
        //placeholder value, we don't computer this here
        isLocked: true
    }
}