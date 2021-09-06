import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AutomaticBidItem } from './model/automatic-bid-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const GATEWAY_URL = environment.gatewayHost

@Injectable({
  providedIn: 'root'
})
export class AutomaticBidItemService {

  constructor(private http: HttpClient) { }

  getUserAutomaticBidConfiguration(userId : number): Observable<AutomaticBidItem> {
    return this.http.get<AutomaticBidItem>(GATEWAY_URL + "/api/automaticBidItem/", { params: {"userId" : userId} });
  }

  saveAutomaticBidConfiguration(userId : number, maxBidAmount : number): Observable<AutomaticBidItem> {
    return this.http.post<AutomaticBidItem>(GATEWAY_URL + "/api/automaticBidItem/", {"userId" : userId, "maxBidAmount" : maxBidAmount});
  }

  startAutomaticBidding(userId : number, itemId : number): Observable<any> {
    return this.http.put<any>(GATEWAY_URL + "/api/automaticBidItem/", {"userId" : userId, "itemId" : itemId});
  }
}
