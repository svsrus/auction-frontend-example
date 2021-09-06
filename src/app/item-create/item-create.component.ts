import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Item } from '../model/item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html'
})
export class ItemCreateComponent implements OnInit {
  loggedUser : User
  newItem : Item = new Item()  
  isSubmitted : boolean = false
  errorMessages : any

  constructor(private itemService : ItemService, private router : Router) { }

  ngOnInit(): void {
    this.getLoggedUser()
  }

  getLoggedUser() {
    let loggedUserJSON = sessionStorage.getItem("loggedUser")
    if (loggedUserJSON != null) {
      this.loggedUser = JSON.parse(loggedUserJSON)
    }
  }

  logOut() {
    sessionStorage.removeItem("loggedUser")
    this.router.navigateByUrl("/", {skipLocationChange : true})
  }

  loadHomePage() {
    this.router.navigateByUrl("/", {skipLocationChange : true})
  }

  isItemNameEmpty() {
    return this.isSubmitted && (this.newItem.name == null || this.newItem.name === "")
  }

  isItemDescriptionEmpty() {
    return this.isSubmitted && (this.newItem.description == null || this.newItem.description === "")
  }

  isItemCurrentPriceEmpty() {
    return this.isSubmitted && this.newItem.current_price == null
  }

  isItemBiddingClosureDateEmpty() {
    return this.isSubmitted && this.newItem.bidding_closure_date == null
  }

  isNewItemInvalid() {
    return this.isItemNameEmpty() && this.isItemDescriptionEmpty() && this.isItemCurrentPriceEmpty() && this.isItemBiddingClosureDateEmpty()
  }

  saveNewItem() {
    this.isSubmitted = true
    if (!this.isNewItemInvalid()) {
      this.itemService.saveNewItem(this.newItem).subscribe(
        data => {
          this.loadHomePage()
        },
        errorResponse => {
          this.errorMessages = errorResponse.error
        }
      )
    }
  }

  isHasBackendErrorMessages() {
    return this.errorMessages != null
  }
}
