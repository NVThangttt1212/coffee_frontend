import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order/order.component";
import {CakeComponent} from "./cake/cake.component";
import {CoffeeComponent} from "./coffee/coffee.component";
import {RevenueComponent} from "./revenue/revenue.component";
import {AccountComponent} from "./account/account.component";
import {SnacksComponent} from "./snacks/snacks.component";
import {OrderDetailComponent} from "./order/order-detail/order-detail.component";


const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'orderDetail/:id', component: OrderDetailComponent},
  {path: 'cake', component: CakeComponent},
  {path: 'coffee', component: CoffeeComponent},
  {path: 'revenue', component: RevenueComponent},
  {path: 'snacks', component: SnacksComponent},
  {path: 'account', component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
