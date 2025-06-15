import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule], // <-- AÑADIR CommonModule AQUÍ
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class AdminSidebarComponent {
   sidebarVisible = false;/* lo tenia puesto en true y era en false por eso me salia doble si */

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
 
}
