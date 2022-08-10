import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'dashboard-detail', component: DashboardDetailComponent, canActivate: [LoginGuard]  },
  { path: 'dashboard/dashboard-detail/:id', component: DashboardDetailComponent, canActivate: [LoginGuard]  },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
