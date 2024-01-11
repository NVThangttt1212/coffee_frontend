import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  column = [
    {id: 'id'}, {id: 'name'}, {id: 'time'}, {id: 'nameCustomer'}, {id: 'note'}, {id: 'total_amount'}, {id: 'paid'},
  ]
  dataAccount: any
  onSearch(data: string): void{
    console.log('tài khoản', data)
  }
}
