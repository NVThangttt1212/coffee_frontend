import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPlatformRoutingModule } from './order-platform-routing.module';
import {LayoutModule} from "../../layout/layout.module";
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    OrderPlatformRoutingModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class OrderPlatformModule {}
