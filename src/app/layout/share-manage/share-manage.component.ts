import {
  Component,
  EventEmitter,
  HostListener,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import { Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-share-manage',
  templateUrl: './share-manage.component.html',
  styleUrl: './share-manage.component.scss'
})

export class ShareManageComponent implements OnInit, OnChanges{
  public subscription: Subscription = new Subscription();
  @ViewChild('drawer') drawer?: MatDrawer;
  @Input() columns: any;
  @Input() totalRevenue?: number;
  @Input() rowData: any;
  @Input() loading = false;
  @Input() noData = false;
  @Input() revenue = false;
  @Input() products = false;
  @Input() order = false;
  @Input() users = false;
  @Input() table = false;
  @Input() account = false;
  @Input() clearSearchProduct = false;
  @Output() clearValueSearch = new EventEmitter<any>();
  @Output() updateRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() categoryProduct: EventEmitter<any> = new EventEmitter<any>();

  @Output() searchValue = new EventEmitter<any>();
  time_gte: Date | null = null;
  time_lte: Date | null = null;
  time_from: number = 0
  time_to: number = 0
  search = ''
  currentLanguage = '';
  emailUser: any;
  first_name: any;
  last_name: any;
  userPosition: any;
  user_id: any;
  constructor(
    private translateService: TranslateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.first_name = localStorage.getItem('first_name')
    this.last_name = localStorage.getItem('last_name')
    this.user_id = localStorage.getItem('id_user')
    this.emailUser = localStorage.getItem('email')
    this.userPosition = localStorage.getItem('position')
    this.subscription.add(
    )
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.clearSearchProduct){
      this.search = ''
    }
  }

  updateRowShare(event: any): void {
    this.updateRow.emit(event);
  }

  categoryProductShare(event: any): void{
    this.categoryProduct.emit(event)
  }
  onSearch(): void {
    if(this.order || this.revenue){
      this.searchValue.emit(
        {
          time_gte: this.time_from,
          time_lte: this.time_to,
          searchValue: this.search
        })
    }else if(this.products){
      this.searchValue.emit(
        {
          searchValue: this.search
        })
    }

  }

  submitDateTime(): void {
    const currentDate = new Date();
    if(this.time_gte && this.time_lte){
      this.time_from = this.time_gte?.getTime()
      this.time_to = this.time_lte?.getTime()

    }else if(this.time_gte &&!this.time_lte){
      this.time_lte = new Date();
      this.time_from = this.time_gte?.getTime()
      this.time_to = this.time_lte?.getTime()
    }else if(!this.time_gte && this.time_lte){
      this.clearDateTime()
    } else if (this.time_lte && this.time_lte.getTime() > currentDate.getTime()) {
      this.time_to = currentDate.getTime();
      this.time_lte = currentDate
    }
    this.searchValue.emit(
      {
        time_gte: this.time_from,
        time_lte: this.time_to,
        searchValue: this.search
      }
    )
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    const currentDate = new Date();
    if (event.key === 'Enter') {
      if(this.time_gte && this.time_lte){
        this.time_from = this.time_gte?.getTime()
        this.time_to = this.time_lte?.getTime()
      }else if(this.time_gte &&!this.time_lte){
        this.time_lte = new Date();
        this.time_from = this.time_gte?.getTime()
        this.time_to = this.time_lte?.getTime()
      }else if(!this.time_gte && this.time_lte){
        this.clearDateTime()
      }else if(this.time_lte && this.time_lte > currentDate) {
        this.time_to = 0
      }
    }
  }

  clearDateTime(): void {
    this.time_from = 0;
    this.time_to = 0;
    this.time_gte = null;
    this.time_lte = null
    this.searchValue.emit({
      time_gte: 0,
      time_lte: 0,
      searchValue: this.search
    }
    )

  }

  onSearchChange(newValue: string): void {
    if (/^\s*$/.test(newValue)) {
      this.clearValueSearch.emit(true);
    }
  }

  onKeyPress(event: any): void {
    if (this.order) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    }
  }


  isValidSearchTerm(): boolean{
    return /\S/.test(this.search);
  }
  clearSearchValue(): void{
    this.search = ''
    this.searchValue.emit(
      {
        time_gte: this.time_from,
        time_lte: this.time_to,
        searchValue: ""
      }
    )
    this.clearValueSearch.emit(true)
  }

  toggle(): void{
    this.drawer?.toggle()
  }

  signOut(): void {
    this.router.navigate(['/login'])
    localStorage.setItem('authToken', '');
  }

  handleLang(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translateService.use(this.currentLanguage);
    localStorage.setItem('lang', this.currentLanguage);
  }

  protected readonly localStorage = localStorage;
}
