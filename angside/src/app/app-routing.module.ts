import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { ErrorComponent } from './error/error.component'

const paths : Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'welcome/:name', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: ErrorComponent }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(paths)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
