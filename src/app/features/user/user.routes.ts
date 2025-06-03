// features/user/user.routes.ts
import { Routes } from '@angular/router';
import { UserComponent } from './user.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./payments/payments.component').then(m => m.PaymentsComponent)
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'subscriptions',
        loadComponent: () =>
          import('./subscriptions/subscriptions.component').then(m => m.SubscriptionsComponent)
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];
