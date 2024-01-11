import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import {MenuComponent} from "./menu/menu.component";
import {LayoutModule} from "../../../layout/layout.module";



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    LayoutModule,
  ]
})
export class MenuModule { }
