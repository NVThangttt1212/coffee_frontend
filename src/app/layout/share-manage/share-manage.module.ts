import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShareManageComponent} from "./share-manage.component";



@NgModule({
  declarations: [ShareManageComponent],
  imports: [
    CommonModule,
  ],
  exports:[
    ShareManageComponent
  ]
})
export class ShareManageModule { }
