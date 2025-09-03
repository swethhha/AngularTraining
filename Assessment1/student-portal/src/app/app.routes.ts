import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Registration } from './registration/registration';
import { List } from './list/list';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'register', component: Registration },
  { path: 'students', component: List }
];
