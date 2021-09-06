import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  username : string = ""
  password : string = ""
  isSubmitted : boolean = false

  constructor(private router : Router) { }

  ngOnInit(): void {}

  isUsernamePasswordInvalid() {
    //TODO verification must be done in backend and channel must be encrypted + HTTPS
    return this.isSubmitted &&
           this.username != "user1@mail.com" && this.password != "123456" && 
           this.username != "user2@mail.com" && this.password != "098765" && 
           this.username != "admin@admin.com" && this.password != "admin123456"
  }

  isUsernameEmpty() {
    return this.isSubmitted && this.username === ""
  }

  isPasswordEmpty() {
    return this.isSubmitted && this.password === ""
  }

  verifyUser() {
    this.isSubmitted = true
    if (!this.isUsernameEmpty() && !this.isPasswordEmpty() && !this.isUsernamePasswordInvalid()) {
      //TODO DUMMY USER1 and USER2 DATA
      const loggedUser = this.createDummyUser()
      
      sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser))

      this.router.navigateByUrl("/", {skipLocationChange : true})
    }
  }

  createDummyUser() {
    const loggedUser = new User()
    if (this.username == "user1@mail.com") {
      loggedUser.user_id = 1
      loggedUser.email = "user1@mail.com"
      loggedUser.first_name = "Marco"
      loggedUser.last_name = "Vazquez"
      loggedUser.role = 2
    } else if(this.username == "user2@mail.com") {
      loggedUser.user_id = 2
      loggedUser.email = "user2@mail.com"
      loggedUser.first_name = "Maria"
      loggedUser.last_name = "Lopez"
      loggedUser.role = 2
    } else {
      loggedUser.user_id = 3
      loggedUser.email = "admin@admin.com"
      loggedUser.first_name = "Sergei"
      loggedUser.last_name = "Shurpenkov"
      loggedUser.role = 1
    }
    return loggedUser
  }
}
