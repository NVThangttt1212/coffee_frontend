import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  dataUsers: any;
  loading = false;
  noData = false;
  constructor() {
  }
  ngOnInit(){

  }
  onSearch(data: any): void{

  }

  updateRow(data: any): void{}
}
