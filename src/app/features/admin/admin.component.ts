import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { AdminSidebarComponent } from '../../layout/sidebar-admin/sidebar-admin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FooterComponent,

    AdminSidebarComponent,
    RouterOutlet,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
