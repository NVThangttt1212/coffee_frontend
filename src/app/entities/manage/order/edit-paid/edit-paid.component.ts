import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShareService} from "../../../../share/share.service";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-edit-paid',
  templateUrl: './edit-paid.component.html',
  styleUrl: './edit-paid.component.scss'
})
export class EditPaidComponent implements OnInit{
  checkboxForm: FormGroup;
  isEditButtonEnabled: boolean = false;
  currenValue: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPaidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: ShareService,
    private orderService: OrderService,
  ) {
    this.currenValue = this.data.isPaid ? 'isPaid' : 'isUnPaid';
    this.checkboxForm = this.fb.group({
      option: this.currenValue
    });
  }

  ngOnInit() {
    const InitValue =  this.checkboxForm.get('option')?.value
    if(InitValue === this.currenValue){
      this.isEditButtonEnabled = true
    }
    this.checkboxForm.get('option')?.valueChanges.subscribe((value) => {
      if(value !== this.currenValue){
        this.isEditButtonEnabled = false
      }else {
        this.isEditButtonEnabled = true
      }
    });
  }

  editStatus(value: any, data: any): void {
      const res = {
        ids: data.ids,
        isPaid: value.option === 'isPaid' ? true : false,
      }
    this.orderService.changeStatusOrder(res).subscribe(
      () =>{
        this.sharedService.triggerRefresh()
        this.closeDialog()
    },
      () => {
        this.closeDialog()

    })
  }

  deleteOrders(data: any): void {
    console.log(data)
    this.orderService.deleteOrders(data).subscribe(
      () =>{
        this.closeDialog()
        this.sharedService.triggerRefresh()
      },
      ()=>{
        this.closeDialog()
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
