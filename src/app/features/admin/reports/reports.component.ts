import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  resumenGeneral = [
    { titulo: 'Usuarios Registrados', valor: 1245 },
    { titulo: 'Suscripciones Activas', valor: 843 },
    { titulo: 'Gasto Promedio por Usuario', valor: '€27,34' },
    { titulo: 'Total por Categoría', valor: '6 categorías' }
  ];

  topSuscripciones = ['Netflix', 'Spotify', 'HBO Max', 'Office 365', 'Disney+'];
  topUsuarios = ['juan@mail.com', 'ana@mail.com', 'carlos@mail.com'];
  topCategorias = ['Streaming', 'Software', 'Educación'];
  usuariosInactivos = ['user1@mail.com', 'user2@mail.com'];
  cambiosMasivos = ['Subida de precio en Netflix', 'Nuevo plan en Office 365'];

  estadisticasTemporales = [
    { titulo: 'Crecimiento de Usuarios', id: 'userGrowthChart' },
    { titulo: 'Gasto Mensual Agregado', id: 'monthlySpendingChart' },
    { titulo: 'Tendencias de Cancelaciones', id: 'cancelTrendChart' }
  ];

  topRankingBloques = [
    { titulo: 'Top 5 Suscripciones', items: this.topSuscripciones },
    { titulo: 'Usuarios con más Suscripciones', items: this.topUsuarios },
    { titulo: 'Categorías con más Gasto', items: this.topCategorias }
  ];

  alertas = [
    { titulo: 'Usuarios Inactivos', items: this.usuariosInactivos },
    { titulo: 'Cambios Masivos Recientes', items: this.cambiosMasivos }
  ];
}
