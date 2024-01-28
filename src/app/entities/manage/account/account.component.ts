import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeteleDialogProductComponent} from "../products/detele-dialog-product/detele-dialog-product.component";
import {AddAccountComponent} from "./add-account/add-account.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  column = [
    {id: 'id'}, {id: 'name'}, {id: 'time'}, {id: 'nameCustomer'}, {id: 'note'}, {id: 'total_amount'}, {id: 'paid'},
  ]
  dataAccount: any;

  constructor( private dialog: MatDialog,) {
  }
  onSearch(data: string): void{
    console.log('tài khoản', data)
  }

  creatAccount(data: boolean): void{
    if(data){
      const dialogRef: MatDialogRef<AddAccountComponent> = this.dialog.open(AddAccountComponent, {
        width: '500px',
        height:'600px',
      });
      dialogRef.afterClosed().subscribe( ()=> {
      })
    }

  }

}
