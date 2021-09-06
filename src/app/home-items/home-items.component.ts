import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item.model';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html'
})
export class HomeItemsComponent implements OnInit {
  items : Array<Item> = []
  itemsCount : number = 0
  searchItemName : string = ""
  searchItemDescription : string = ""
  selectedOrderBy: string = ""
  loggedUser : User

  constructor(private itemService: ItemService, private router : Router) {
  }

  ngOnInit() {
    this.getLoggedUser()
    this.getLatestItems()
  }

  getLoggedUser() {
    let loggedUserJSON = sessionStorage.getItem("loggedUser")
    if (loggedUserJSON != null) {
      this.loggedUser = JSON.parse(loggedUserJSON)
    }
  }

  isAdminLoggedIn() {
    return this.loggedUser != null && this.loggedUser.role == 1
  }

  isUserLoggedIn() {
    return this.loggedUser != null && this.loggedUser.role == 2
  }

  getLatestItems() {
    this.itemService.getLatestItems(this.itemsCount).subscribe(
      data => {
        this.items = data
      }
    )
  }

  getLatestItemsInOrder() {
    this.itemService.getLatestItemsInOrder(this.itemsCount, this.selectedOrderBy).subscribe(
      data => {
        this.items = data
      }
    )
  }

  paginateLeft() {
    this.itemsCount -= 10
    if (this.itemsCount < 0) {
      this.itemsCount = 0
    }
    this.searchItemsInOrder()
  }

  paginateRight() {
    if (this.items != null && this.items.length == 10) {
      this.itemsCount += 10
    }
    this.searchItemsInOrder()
  }

  searchItemsInOrder() {
    if (this.searchItemName != "" || this.searchItemDescription != "") {
      this.itemsCount = 0
      this.itemService.searchItemsInOrder(this.searchItemName, this.searchItemDescription, this.itemsCount, this.selectedOrderBy).subscribe(
        data => {
          this.items = data
        }
      )
    } else {
      this.getLatestItemsInOrder()
    }
  }

  orderByItems(selectedOrderBy : any) {
    this.selectedOrderBy = selectedOrderBy.target.value
    this.itemsCount = 0
    this.searchItemsInOrder()
  }

  loadLoginPage() {
    this.router.navigateByUrl("/login/", {skipLocationChange : true})
  }
 
  loadNewItemPage() {
    this.router.navigateByUrl("/item/", {skipLocationChange : true})
  }

  loadAutomaticBidItemPage() {
    this.router.navigateByUrl("/automaticBidItem/", {skipLocationChange : true})
  }

  loadBidItemPage(itemId : number) {
    this.router.navigateByUrl("/bidItem/" + itemId,  {skipLocationChange : true})
  }

  logOut() {
    sessionStorage.removeItem("loggedUser")
    this.loggedUser = null as any
    this.router.navigateByUrl("/", {skipLocationChange : true})
  }
}
