import{ Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'calendar',
        loadComponent: () =>
          import('./calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./reports/reports.component').then(m => m.ReportsComponent)
      },
     
      {
        path: 'user-mng',
        loadComponent: () =>
          import('./users-mng/users-mng.component').then(m => m.UsersMngComponent)
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];