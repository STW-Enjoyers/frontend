import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

export const appRoutes: Routes = [
  {
    path: 'register',
    component: UserComponent,
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'login',
    component: UserComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [{ path: '', component: UserprofileComponent }],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
