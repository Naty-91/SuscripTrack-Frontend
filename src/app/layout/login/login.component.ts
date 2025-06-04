import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  sub: string;
  roles: string[]; // o 'role' si es uno solo
  exp: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  password: string = '';
  error: string | null = null;

  login() {
  this.authService.login(this.username, this.password).subscribe({
    next: (response) => {
      this.authService.setToken(response.token);

      const decoded = jwtDecode<JwtPayload>(response.token);
      const roles = decoded.roles;

      if (roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/admin']);
      } else if (roles.includes('ROLE_USER')) {
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/forbidden']);
      }
    },
    error: () => {
      this.error = 'Usuario y contraseña inválido';
    }
  });
}

}


