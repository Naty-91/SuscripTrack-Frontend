import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserSidebarComponent } from './layout/sidebar-user/sidebar-user.component';
import { AdminSidebarComponent } from './layout/sidebar-admin/sidebar-admin.component';
import { CarruselComponent } from './layout/carrusel/carrusel.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    UserSidebarComponent,
    AdminSidebarComponent,
    CarruselComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'maquetacion_SuscripTrack';

  isAdmin = false;
  isUser = false;

  constructor(private authService: AuthService) {}

ngOnInit(): void {
  this.authService.getUserRole().subscribe(role => {
    this.isAdmin = role === 'ROLE_ADMIN';
    this.isUser = role === 'ROLE_USER';
  });
}

}
