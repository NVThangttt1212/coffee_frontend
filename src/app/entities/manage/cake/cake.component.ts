import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Cake {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}
@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrl: './cake.component.scss'
})
export class CakeComponent {
  onSearch(data: string): void{
    console.log('bánh ngọt', data)
  }
}
