import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./layout/login/login.component";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule) },
  {path: 'login', component: LoginComponent},
  // { path: 'error', component: ErrorComponent},
  // { path: '**', redirectTo: '/error', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
