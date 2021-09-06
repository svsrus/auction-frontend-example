import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { HomeItemsComponent } from './home-items/home-items.component';
import { BidItemComponent } from './bid-item/bid-item.component';
import { AutomaticBidItemComponent } from './automatic-bid-item/automatic-bid-item.component';
import { ItemCreateComponent } from './item-create/item-create.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeItemsComponent,
    BidItemComponent,
    AutomaticBidItemComponent,
    ItemCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})

export class AppModule { }
