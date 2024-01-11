import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

import {Subscription} from "rxjs";
import {ShareService} from "../../share/share.service";
import {MatDialog} from "@angular/material/dialog";

import {Router} from "@angular/router";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit ,OnChanges, OnDestroy{
  private subscriptions = new Subscription();
  @Output() updateRow: EventEmitter<any> = new EventEmitter<any>();

  @Input() columns: any;
  @Input() totalRevenue?: number
  @Input() rowData: any[] = [];
  @Input() loading = false;
  @Input() noData = false;
  @Input() order = false;
  @Input() cake = false;
  @Input() coffee = false;
  @Input() snacks = false;
  @Input() revenue = false;
  @Input() account = false;
  totals: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  selectedItems: any[] = [];
  totalSelect: number = 0;
  selectedAll = false;
  constructor(private shareService: ShareService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.shareService.refresh$.subscribe(() => {
        this.refresh();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.rowData && this.rowData.length) {
      this.totals = this.rowData.length;

      this.rowData.sort((a: any, b: any) => {
        const dateA = new Date(a.date_order);
        const dateB = new Date(b.date_order);
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      this.totals = 0;
    }
  }

  deleteCol(): void{
    this.updateRow.emit({
      ids: this.selectedItems.map(item => item.order_id),
      isDelete: true
    }
  )
  }
  detail(event: any): void{
    this.order && this.route.navigate(['manage','orderDetail', Number(event.order_id)]);
  }
  delete(event: any): void{
    this.updateRow.emit({
      ids: [event.order_id],
      isDelete: true
    })
  }

  changStatus(): void {
    const allItemsArePaid = this.selectedItems.every(item => item.is_paid === "1");
    const allItemsAreUnPaid = this.selectedItems.every(item => item.is_paid === "0");
    this.updateRow.emit({
      ids: this.selectedItems.map(item => item.order_id),
      isPaid : allItemsArePaid,
      isUnPaid : allItemsAreUnPaid,
      error:  !allItemsArePaid && !allItemsAreUnPaid,
    })
  }

  changStatusTable(event: any) : void {
    this.updateRow.emit({
      ids: [event.order_id],
      isPaid : event.is_paid === '1',
      isUnPaid : event.is_paid === '0'
    })
  }

  refresh(){
    this.selectedItems = []
    this.selectedAll = false
    this.totalSelect = 0
  }

  get totalPages(): number {
    if (this.rowData && this.rowData.length) {
      return Math.ceil(this.rowData.length / this.pageSize);
    } else {
      return 0; // hoặc giá trị mặc định nếu không có dữ liệu
    }
  }


  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.rowData.slice(startIndex, startIndex + this.pageSize);
  }


  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  selectItem(event: any, item: any): void {
    if (event.target.checked) {
      this.selectedItems.push(item);
      this.totalSelect = this.selectedItems.length
    } else {
      const index = this.selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }

    this.updateSelectAllStatus();
    if (!this.isAllItemsSelected()) {
      this.selectedAll = false;
    }
  }
  isAllItemsSelected(): boolean {
    return this.selectedItems.length === this.rowData.length;
  }

  selectAll(): void {
    this.selectedAll === this.selectedAll
    if(this.selectedAll){
      this.selectedItems = [...this.rowData];
    }else {
      this.selectedItems = []
    }
  }
  isItemSelected(item: any): boolean {
    return this.selectedItems.some((selectedItem) => selectedItem.order_id === item.order_id);
  }
  isSelected(item: any): boolean {
    return this.selectedAll || this.isItemSelected(item);
  }
  updateSelectAllStatus(): void {
    this.selectedAll = this.selectedItems.length === this.rowData.length;
  }


  protected readonly localStorage = localStorage;
}
