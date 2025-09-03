import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { BugsComponent } from './pages/bugs/bugs';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent,title:'Dashboard',canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'bugs',component:BugsComponent,title:'Bugs',canActivate:[AuthGuard]},
    {path:'**',redirectTo:'login',pathMatch:'full'}
];