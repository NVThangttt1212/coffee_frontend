import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LayoutModule} from "./layout/layout.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EntitiesModule} from "./entities/entities.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ShareService} from "./share/share.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    LayoutModule,
    EntitiesModule,
    FormsModule,
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
