import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../environments/environments.component';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Registration } from '../../models/registration.model';
import { User } from '../../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environments.apiUrl}/v1/users`;

  constructor(
    private http: HttpClient,
    private authservice: AuthService
  ) {}

  /** Registrar un nuevo usuario */
  createUser(registration: Registration): Observable<any> {
    const body = JSON.stringify(registration);

    return this.http.post(`${this.apiUrl}/register`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap(() => console.log(' Usuario registrado correctamente.')),
      catchError(this.handleError('crear usuario'))
    );
  }

  /** Obtener un usuario por ID */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError('obtener usuario por ID'))
    );
  }

  /** Actualizar usuario existente */
  updateUser(id: number, userData: Partial<Registration>): Observable<User> {
    console.log(' Payload enviado al backend:', userData); //  Añadido para depuración

    return this.http.put<User>(`${this.apiUrl}/${id}`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap(() => console.log(' Usuario actualizado correctamente.')),
      catchError(this.handleError('actualizar usuario'))/* adapatar el error pero  */
    );/* redirigir a la tabla de user-mng */
  }

  /** Eliminar usuario */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(' Usuario eliminado.')),
      catchError(this.handleError('eliminar usuario'))
    );
  }

  /** Manejo de errores mejorado */
  private handleError(context: string) {
    return (err: any) => {
      const backendMessage = err?.error?.message || err.message || 'desconocido';
      console.error(` Error al ${context}:`, err);
      alert(`Error al ${context}: ${backendMessage}`);
      return throwError(() => new Error(backendMessage));
    };
  }
}
