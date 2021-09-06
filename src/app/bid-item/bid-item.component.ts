import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { ItemService } from '../item.service';
import { Item } from '../model/item.model';
import { AutomaticBidItemService } from '../automatic-bid-item.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bid-item',
  templateUrl: './bid-item.component.html'
})
export class BidItemComponent implements OnInit {
  loggedUser : User
  lastBidItemUser : User = new User()
  item : Item = new Item()
  automaticBidding : boolean = false

  constructor(private itemService : ItemService, private userService : UserService, private automaticBidItemService : AutomaticBidItemService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.getSelectedItem()
    this.getLoggedUser()
    this.getLastBidItemUser()
  }

  getSelectedItem() {
    this.itemService.getItem(Number(this.route.snapshot.paramMap.get("itemId"))).subscribe(
      data => {
        this.item = data
      }
    )
  }

  getLoggedUser() {
    let loggedUserJSON = sessionStorage.getItem("loggedUser")
    if (loggedUserJSON != null) {
      this.loggedUser = JSON.parse(loggedUserJSON)
    }
  }

  getLastBidItemUser() {
    this.userService.getLastBidItemUser(Number(this.route.snapshot.paramMap.get("itemId"))).subscribe(
      data => {
        this.lastBidItemUser = data
      }, error => {
        //In case of Item not yet has any bids by any users
        this.lastBidItemUser = new User()
      }
    )
  }
  
  isLastBidItemUserEqualsLoggedUser() {
    return this.lastBidItemUser.user_id == this.loggedUser.user_id
  }

  isAutomaticBidding() {
    return this.automaticBidding != null && this.automaticBidding == true
  }

  startAutoBidding() {
    this.itemService.postBidItem(this.loggedUser.user_id, this.item.item_id).subscribe(
      data => {
        this.automaticBidItemService.startAutomaticBidding(this.loggedUser.user_id, this.item.item_id).subscribe(
          data => {
            this.loadHomePage()
          }
        )
      }
    )
  }

  bidItem() {
    this.itemService.postBidItem(this.loggedUser.user_id, this.item.item_id).subscribe(
      data => {
        this.loadHomePage()
      }
    )
  }

  logOut() {
    sessionStorage.removeItem("loggedUser")
    this.router.navigateByUrl("/", {skipLocationChange : true})
  }

  loadHomePage() {
    this.router.navigateByUrl("/", {skipLocationChange : true})
  }

  loadAutomaticBidItemPage() {
    this.router.navigateByUrl("/automaticBidItem/", {skipLocationChange : true})
  }
}