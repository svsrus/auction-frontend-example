import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './model/item.model';
import { environment } from 'src/environments/environment';
import { User } from './model/user.model';

export const GATEWAY_URL = environment.gatewayHost

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getLatestItems(itemsCount : number): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(GATEWAY_URL + "/api/latestItems/",  { params: {'shownItemsCount': itemsCount} });
  }

  getLatestItemsInOrder(itemsCount : number, orderBy : string): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(GATEWAY_URL + "/api/latestItems/",  { params: {'shownItemsCount': itemsCount, "orderBy" : orderBy} });
  }

  searchItemsInOrder(itemName : string, itemDescription : string, itemsCount : number, orderBy : string): Observable<Array<Item>> {
    const params = {"searchItemName" : itemName, 
                    "searchItemDescription" : itemDescription, 
                    "shownItemsCount": itemsCount, 
                    "orderBy" : orderBy}
    return this.http.get<Array<Item>>(GATEWAY_URL + "/api/searchItems/",  { params: params });
  }

  getItem(itemId : number): Observable<Item> {
    return this.http.get<Item>(GATEWAY_URL + "/api/item/", { params: {"itemId" : itemId} });
  }

  postBidItem(userId : number, itemId : number): Observable<any> {
    return this.http.post(GATEWAY_URL + "/api/bidItem/", {"userId" : userId, "itemId" : itemId})
  }

  saveNewItem(newItem : Item): Observable<any> {
    return this.http.post(GATEWAY_URL + "/api/item/", newItem)
  }
}
