import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../../layout/sidebar-admin/sidebar-admin.component';
import { UserMngService } from '../../../core/services/user-mng.service';
import { RouterLink } from '@angular/router';

// Importa Bootstrap JS manualmente
declare const bootstrap: any;

@Component({
  selector: 'app-users-mng',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent,
    RouterLink
  ],
  templateUrl: './users-mng.component.html',
  styleUrls: ['./users-mng.component.scss']
})
export class UsersMngComponent implements OnInit {
  users: any[] = [];
  error: string | null = null;
  selectedUser: any = null;

  constructor(private userService: UserMngService, private router: Router) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe({
      next: (res: any) => {
        this.users = res.content;
      },
      error: (err) => {
        if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        } else {
          this.error = 'Ocurrió un error al cargar los usuarios';
        }
      }
    });
  }

  getRolesAsText(user: any): string {
    return user?.roles?.map((role: any) => role.name).join(', ') || '';
  }

  confirmDelete(user: any): void {
    const confirmed = confirm(`¿Estás seguro de que deseas eliminar al usuario "${user.username}"?`);
    if (confirmed) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
        },
        error: (err) => {
          this.error = 'Error al eliminar el usuario';
        }
      });
    }
  }

  openUserModal(user: any): void {
    this.selectedUser = user;
    const modalElement = document.getElementById('viewUserModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
