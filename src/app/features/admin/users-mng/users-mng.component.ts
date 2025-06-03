import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <== IMPORTANTE
import { AdminSidebarComponent } from '../../../layout/sidebar-admin/sidebar-admin.component';
import { UserMngService } from '../../../core/services/user-mng.service';

@Component({
  selector: 'app-users-mng',
  standalone: true,
  imports: [
    CommonModule,            // <-- Esto activa NgIf, NgFor, DatePipe, SlicePipe, etc.
    AdminSidebarComponent
  ],
  templateUrl: './users-mng.component.html',
  styleUrls: ['./users-mng.component.scss']
})
export class UsersMngComponent implements OnInit {
  users: any[] = [];
  error: string | null = null;

  constructor(private userService: UserMngService, private router: Router) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe({
      next: (res: any) => {
        this.users = res;
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
  return user.roles?.map((role: any) => role.name).join(', ') || '';
}



}
