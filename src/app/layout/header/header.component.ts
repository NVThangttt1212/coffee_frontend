import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    public translate: TranslateService
  ) {
  }
  changeLang(lang: string): void {
    this.translate.use(lang)
    localStorage.setItem('lang', lang)
  }

}
