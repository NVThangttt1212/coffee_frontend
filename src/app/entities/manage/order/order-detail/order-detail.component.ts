import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit{
  constructor(private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getDetailOrder(id)
    });
  }

  getDetailOrder(id: any): void{
    const res = {
      id : id
    }
    console.log(res)
    this.orderService.getDetailOrders(res).subscribe()
  }

}
