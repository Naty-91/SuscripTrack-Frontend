import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
      this.authService.setToken(response.token); // usar `setToken`, no `storeTokens`
      this.router.navigate(['/']); // redirección tras login exitoso
    },
    error: () => {
      this.error = 'Usuario y contraseña inválido';
    }
  });
}

}
