import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { UserSidebarComponent } from '../../../layout/sidebar-user/sidebar-user.component';
interface Subscription {
  id: number;
  name: string;
  category: string;
  cost: number;
  billingDate: string;
  status: 'active' | 'inactive';
}

interface BillingHistory {
  transactionId: string;
  date: string;
  amount: number;
  status: 'Pagado' | 'Pendiente';
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  standalone: true,
   imports: [UserSidebarComponent,
    CommonModule, ]
})
export class PaymentsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  billingHistory: BillingHistory[] = [];

  ngOnInit(): void {
    // Simulación de datos
    this.subscriptions = [
      { id: 1, name: 'Spotify', category: 'Plataformas de Entretenimiento Digital', cost: 9.99, billingDate: '2025-06-01', status: 'active' },
      { id: 2, name: 'Xbox Game Pass', category: 'Gaming y Entretenimiento', cost: 14.99, billingDate: '2025-06-10', status: 'active' },
      { id: 3, name: 'Google Drive', category: 'Software y Herramientas', cost: 6.49, billingDate: '2025-05-15', status: 'active' }
    ];

    this.billingHistory = [
      { transactionId: '#10001', date: '15/05/2025', amount: 9.99, status: 'Pagado' },
      { transactionId: '#10002', date: '10/05/2025', amount: 14.99, status: 'Pagado' },
      { transactionId: '#10003', date: '05/05/2025', amount: 6.49, status: 'Pagado' },
      { transactionId: '#10004', date: '01/06/2025', amount: 9.99, status: 'Pendiente' }
    ];
  }
}
