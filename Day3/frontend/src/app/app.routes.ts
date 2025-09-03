import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { BugsComponent } from './pages/bugs/bugs';


export const routes: Routes = [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent,title:'Dashboard'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'bugs',component:BugsComponent,title:'Bugs'},
    {path:'**',redirectTo:'dashboard',pathMatch:'full'}
    
];