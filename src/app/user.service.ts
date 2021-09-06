import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const GATEWAY_URL = environment.gatewayHost

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getLastBidItemUser(itemId : number): Observable<User> {
    return this.http.get<User>(GATEWAY_URL + "/api/lastBidItemUser/", { params: {"itemId" : itemId} });
  }
}
