import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-detele-dialog-product',
  templateUrl: './detele-dialog-product.component.html',
  styleUrl: './detele-dialog-product.component.scss'
})
export class DeteleDialogProductComponent implements OnInit{
  constructor(
    private dialogRef: MatDialogRef<DeteleDialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService : ProductsService
  ) {}

  ngOnInit() {
  }

  closeDialog(): void{
    this.dialogRef.close()
  }

  delete(data: any): void{
    this.productService.deleteProduct(data).subscribe(
      res =>{
        this.closeDialog()
      },
      error =>{
        console.log('lỗi delete')
      }
    )

  }

}
