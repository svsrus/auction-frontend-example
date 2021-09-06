import { BidItem } from './bid-item.model';

export class Item {
    item_id : number
    name : string
    description : string 
    current_price : number
    bidding_closure_date : Date
    bids : Array<BidItem>
}