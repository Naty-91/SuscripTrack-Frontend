import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError, Observable, TimeoutError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environments } from '../../../environments/environments.component';

import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private token = new BehaviorSubject<string | null>(null);

  login(username: string, password: string): Observable<{ token: string }> {
    localStorage.removeItem('token');

    return this.http.post<{ token: string }>(
      `${environments.apiUrl}/v1/authenticate`,
      { username, password },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      tap(response => {
        this.setToken(response.token);
        console.log('Login exitoso');
      }),
      catchError(err => {
        console.error('Error al iniciar sesión:', err.message);
        if (err instanceof TimeoutError || err.status === 0) {
          return throwError(() => new Error('Error al realizar la petición. Inténtelo de nuevo más tarde'));
        }
        return throwError(() => new Error(err.error?.message || 'Error inesperado'));
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token.next(token);
  }

  getToken(): string | null {
    const current = this.token.value;
    if (current) return current;

    const stored = localStorage.getItem('token');
    if (stored) {
      this.token.next(stored);
      return stored;
    }
    return null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.token.asObservable().pipe(map(token => !!token));
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  getUserRole(): Observable<string | null> {
    return this.token.asObservable().pipe(
      map(token => {
        if (token) {
          try {
            const decoded: any = jwtDecode(token);
            return decoded.roles?.[0] || null;
          } catch (error) {
            console.error('Error decodificando el token:', error);
            return null;
          }
        }
        return null;
      })
    );
  }

  getUserRoleGuard(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles?.[0] || null;
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.next(null);
    this.router.navigate(['/']);
  }
}
