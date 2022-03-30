import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  {
    path: 'register',
    component: UserComponent,
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
];
