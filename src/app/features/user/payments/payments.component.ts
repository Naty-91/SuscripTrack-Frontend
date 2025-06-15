import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
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

interface PaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  standalone: true,
  imports: [UserSidebarComponent, CommonModule, FormsModule]
})
export class PaymentsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  billingHistory: BillingHistory[] = [];
  paymentMethods: PaymentMethod[] = [];

  newPayment: PaymentMethod = {
    brand: 'Visa',
    last4: '',
    expiry: '',
    isDefault: false
  };

  ngOnInit(): void {
    // Simulación de suscripciones
    this.subscriptions = [
      { id: 1, name: 'Spotify', category: 'Plataformas de Entretenimiento Digital', cost: 9.99, billingDate: '2025-06-01', status: 'active' },
      { id: 2, name: 'Xbox Game Pass', category: 'Gaming y Entretenimiento', cost: 14.99, billingDate: '2025-06-10', status: 'active' },
      { id: 3, name: 'Google Drive', category: 'Software y Herramientas', cost: 6.49, billingDate: '2025-05-15', status: 'active' }
    ];

    // Simulación de historial de facturación
    this.billingHistory = [
      { transactionId: '#10001', date: '15/05/2025', amount: 9.99, status: 'Pagado' },
      { transactionId: '#10002', date: '10/05/2025', amount: 14.99, status: 'Pagado' },
      { transactionId: '#10003', date: '05/05/2025', amount: 6.49, status: 'Pagado' },
      { transactionId: '#10004', date: '01/06/2025', amount: 9.99, status: 'Pendiente' }
    ];

    // Métodos de pago simulados
    this.paymentMethods = [
      { brand: 'Visa', last4: '1234', expiry: '04/2024', isDefault: true },
      { brand: 'Mastercard', last4: '5678', expiry: '05/2022', isDefault: false },
      { brand: 'American Express', last4: '9012', expiry: '01/2026', isDefault: false }
    ];
  }

  savePaymentMethod(): void {
    if (this.newPayment.isDefault) {
      this.paymentMethods.forEach(pm => pm.isDefault = false);
    }

    this.paymentMethods.push({ ...this.newPayment });

    // Resetear el formulario
    this.newPayment = {
      brand: 'Visa',
      last4: '',
      expiry: '',
      isDefault: false
    };
  }
}
