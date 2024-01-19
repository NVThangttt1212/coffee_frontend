import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order/order.component";
import {RevenueComponent} from "./revenue/revenue.component";
import {AccountComponent} from "./account/account.component";
import {OrderDetailComponent} from "./order/order-detail/order-detail.component";
import {UsersComponent} from "./users/users.component";
import {TablesComponent} from "./tables/tables.component";
import {ProductsComponent} from "./products/products.component";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";


const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'orderDetail/:id', component: OrderDetailComponent},
  {path: 'revenue', component: RevenueComponent},
  {path: 'account', component: AccountComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'productDetail/:id', component: ProductDetailComponent},
  {path: 'users', component: UsersComponent},
  {path: 'table', component: TablesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
