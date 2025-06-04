import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../environments/environments.component';
import { AuthService } from './auth.service';
import { Registration } from '../../models/registration.model';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authservice: AuthService
  ) {}

  createUser(registration: Registration): Observable<any> {
    console.log(registration);

    const body = JSON.stringify(registration);

    return this.http.post(
      `${environments.apiUrl}/v1/users/register`,
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      tap(response => {
        console.log('Usuario registrado correctamente.');
      }),
      catchError(err => {
        console.error('Error al crear el usuario:', err.error.message);

        if (err instanceof TimeoutError || err.status === 0) {
          return throwError(() =>
            new Error('Error al registrar al usuario. Inténtelo de nuevo más tarde')
          );
        }

        return throwError(() => new Error(err.error.message));
      })
    );
  }

}
