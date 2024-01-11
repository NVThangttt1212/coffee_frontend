import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {OrderService} from "./order.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditPaidComponent} from "./edit-paid/edit-paid.component";
import {ShareService} from "../../../share/share.service";
import {Subscription} from "rxjs";

interface Orders {
  id: number;
  name: string;
  time: number;
  nameCustomer: string;
  note: string;
  total_amount: number;
  paid: boolean
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, OnDestroy{
  private subscriptions = new Subscription();
  loading = false;
  noData = false;
  column = [
    {id: 'id'}, {id: 'name'}, {id: 'time'}, {id: 'nameCustomer'}, {id: 'note'}, {id: 'total_amount'}, {id: 'paid'},
  ]
  dataOrders: Orders[] = []

  constructor(
    private translate: TranslateService,
    private shareService: ShareService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private sharedService: ShareService
  ) {}
  ngOnInit() {
    this.subscriptions.add(
      this.shareService.refresh$.subscribe(() => {
        this.getOrders()
      })
    );
    this.getOrders()
  }
  clearValueSearch(): void{
    this.getOrders()
  }
  getOrders(){
    this.loading = true;
    this.orderService.getOrder().subscribe(res =>{
      if (res !== null && res !== undefined) {
        this.dataOrders = res
        this.loading = false
        if(res.length === 0){
          this.noData = true
        }

      } else {
        this.loading = false;
        this.noData = true;
      }
    }, error => {
      this.loading = false;
      this.noData = true;
    })
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSearch(data: string): void{
    this.loading = true
    const req = {
      data: data
    }
    if(data){
      this.orderService.searchOrders(req).subscribe(
        res =>{
          if(res.length === 0){

            this.dataOrders = []
            this.noData = true;
            this.loading = false
          }else {
            this.dataOrders = res;
            this.loading = false;
          }
        },
        ()=>{
          this.dataOrders = []
          this.loading = false;
          this.noData = true;
        }
      )
    }
  }

  updateRow(event: any): void {
    if(event.error){
      alert('vui lòng chọn đơn hàng cùng trạng thái')
      this.sharedService.triggerRefresh()
    }else {
      if(event.isDelete){
        const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
          width: '300px',
          height:'160px',
          data: event
        });
        dialogRef.afterClosed().subscribe( ()=> {

        })
      } else if(event.isPaid){
        const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
          width: '360px',
          height:'280px',
          data: event
        });
        dialogRef.afterClosed().subscribe( ()=> {


        })
      }else {
        const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
          width: '360px',
          height:'280px',
          data: event
        });
        dialogRef.afterClosed().subscribe( ()=> {

        })
      }
    }

  }

}
