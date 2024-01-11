import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import {CakeComponent} from "./cake/cake.component";
import {CoffeeComponent} from "./coffee/coffee.component";
import {OrderComponent} from "./order/order.component";
import {TranslateModule} from "@ngx-translate/core";
import {ShareManageComponent} from "../../layout/share-manage/share-manage.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RevenueComponent} from "./revenue/revenue.component";
import {AccountComponent} from "./account/account.component";
import {LayoutModule} from "../../layout/layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TableComponent} from "../../layout/table/table.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EditPaidComponent} from "./order/edit-paid/edit-paid.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SnacksComponent} from "./snacks/snacks.component";
import {OrderDetailComponent} from "./order/order-detail/order-detail.component";

@NgModule({
  declarations: [
    CakeComponent,
    EditPaidComponent,
    OrderDetailComponent,
    CoffeeComponent,
    OrderComponent,
    RevenueComponent,
    ShareManageComponent,
    SnacksComponent,
    TableComponent,
    AccountComponent
  ],
    imports: [
        CommonModule,
        ManageRoutingModule,
        TranslateModule,
        MatSidenavModule,
        LayoutModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatMenuModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatRadioModule,
        MatProgressSpinnerModule
    ]
})
export class ManageModule { }
