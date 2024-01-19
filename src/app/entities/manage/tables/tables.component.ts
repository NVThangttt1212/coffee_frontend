import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit{
  dataTale: any;
  loading= false;
  noData = false;

  constructor() {
  }
  ngOnInit(){
  }
  onSearch(data: any): void{
  }
  updateRow(data: any): void{}

}
