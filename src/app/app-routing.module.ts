import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeItemsComponent } from './home-items/home-items.component';
import { BidItemComponent } from './bid-item/bid-item.component';
import { AutomaticBidItemComponent } from './automatic-bid-item/automatic-bid-item.component';
import { ItemCreateComponent } from './item-create/item-create.component';

const routes: Routes = [
  { path: '', component: HomeItemsComponent },
  { path: 'login/', component: LoginComponent },
  { path: 'item/', component: ItemCreateComponent },
  { path: 'automaticBidItem/', component: AutomaticBidItemComponent },
  { path: 'bidItem/:itemId', component: BidItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
