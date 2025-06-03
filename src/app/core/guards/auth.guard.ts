import { ActivatedRouteSnapshot, CanActivate, CanActivateFn,RouteConfigLoadEnd, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

          // Verificar si el entorno es el navegador
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      console.log('token ok');
      return true;  // Si existe el token en localStorage, se permite el acceso
    } else {
      console.log('token ko');
      this.router.navigate(['/login']);
      return false;  // Si no, redirigir a la página de login
    }
  }
}