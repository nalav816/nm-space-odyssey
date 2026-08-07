import { Player } from "./playerService";
import { Entity, getRating} from "./entityService";

export interface Shop {
    astronauts: Entity[];
    rocketry: Entity[];
}

// function sortShopItems(a: Entity, b: Entity) {
//     if (getRating(a.name) !== b.rating) {
//         return a.rating - b.rating
//     }

//     return a.price - b.price
// }

