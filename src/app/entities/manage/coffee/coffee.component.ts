import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Coffee {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}
@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.scss'
})
export class CoffeeComponent {
  onSearch(data: string): void{
    console.log('cà phê', data)
  }
}
