import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ScrollTopComponent} from "./scroll-top/scroll-top.component";


@NgModule({
  declarations: [
    HeaderComponent,
    ScrollTopComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    ScrollTopComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,

  ]
})
export class LayoutModule { }
