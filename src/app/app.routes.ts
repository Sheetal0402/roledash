import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardWrapperComponent } from './components/dashboard-wrapper.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardWrapperComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
