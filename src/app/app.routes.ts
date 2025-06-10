import { Routes } from '@angular/router';

import { PrincipalComponent } from './layout/principal/principal.component';
import { AboutComponent } from './features/about/about.component';
import { UserComponent } from './features/user/user.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { ContactComponent } from './features/contact/contact.component';
import { Error404Component } from './features/error404/error404.component';
import { ForbiddenComponent } from './features/forbidden/forbidden.component';
import { AdminComponent } from './features/admin/admin.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'prestaciones', component: PrestacionesComponent },

  {
    path: 'user',
    component: UserComponent,
   /*  canActivate: [AuthGuard] */
     loadChildren: () =>
      import('./features/user/user.routes').then(m => m.USER_ROUTES) 
  },

  {
    path: 'admin',
    component: AdminComponent,
   loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES) 
  },

  { path: 'login', component: LoginComponent },



  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: Error404Component }
];
