import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AutomaticBidItem } from '../model/automatic-bid-item.model';
import { AutomaticBidItemService } from '../automatic-bid-item.service';

@Component({
  selector: 'app-automatic-bid-item',
  templateUrl: './automatic-bid-item.component.html'
})
export class AutomaticBidItemComponent implements OnInit {
  loggedUser : User
  automaticBidItem : AutomaticBidItem = new AutomaticBidItem()
  isSubmitted : boolean = false
  
  constructor(private automaticBidItemService : AutomaticBidItemService, private router : Router) { }

  ngOnInit(): void {
    this.getLoggedUser()
    this.getUserAutomaticBidItemConfiguration()
  }

  getLoggedUser() {
    let loggedUserJSON = sessionStorage.getItem("loggedUser")
    if (loggedUserJSON != null) {
      this.loggedUser = JSON.parse(loggedUserJSON)
    }
  }

  getUserAutomaticBidItemConfiguration() {
    this.automaticBidItemService.getUserAutomaticBidConfiguration(this.loggedUser.user_id).subscribe(
      data => {
        this.automaticBidItem = data
      }
    )
  }

  isMaxBidAmountEmpty() {
    return this.isSubmitted && (this.automaticBidItem.max_bid_amount == null || this.automaticBidItem.max_bid_amount < 0)
  }

  saveAutoBidItemConfiguration() {
    this.isSubmitted = true
    if (!this.isMaxBidAmountEmpty()) {
      this.automaticBidItemService.saveAutomaticBidConfiguration(this.loggedUser.user_id, this.automaticBidItem.max_bid_amount).subscribe(
        data => {
          this.loadHomePage()
        }
      )
    }
  }

  logOut() {
    sessionStorage.removeItem("loggedUser")
    this.router.navigateByUrl("/", {skipLocationChange : true})
  }

  loadHomePage() {
    this.router.navigateByUrl("/", {skipLocationChange : true})
  }
}
