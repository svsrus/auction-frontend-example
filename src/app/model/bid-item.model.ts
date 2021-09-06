import { User } from './user.model';
import { Item } from './item.model';

export class BidItem {
    bid_item_id : string
    user : User
    item : Item
    price : number
    date : string
}