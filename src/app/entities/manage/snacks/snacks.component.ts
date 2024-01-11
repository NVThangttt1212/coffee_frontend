import { Component } from '@angular/core';
interface Snacks {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}
@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrl: './snacks.component.scss'
})
export class SnacksComponent {
  column = [
    {id: 'id'}, {id: 'name'}, {id: 'time'}, {id: 'nameCustomer'}, {id: 'note'}, {id: 'total_amount'}, {id: 'paid'},
  ]
  dataSnacks: Snacks[] = [];
  loading = false;
  noData = false;
  constructor() {
  }

  onSearch(data: any){

  }

  updateRow(data: any){

  }
}
