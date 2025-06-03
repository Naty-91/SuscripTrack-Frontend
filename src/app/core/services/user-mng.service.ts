import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de tener un AuthService con el método getToken()
import { environments } from '../../../environments/environments.component';// Contiene la URL base de tu API

@Injectable({
  providedIn: 'root'
})
export class UserMngService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Método para obtener la lista de usuarios desde la API.
   * @returns Observable con el listado de usuarios.
   */
  fetchUsers(): Observable<any> {
    const token = this.authService.getToken(); // Obtiene el token del AuthService

    if (!token) {
      // Si no hay token, lanza un error indicando que el usuario no está autorizado.
      return throwError(() => new Error('Unauthorized'));
    }

    // Realiza la solicitud GET al endpoint de usuarios, con el token en los headers.
    return this.http.get(`${environments.apiUrl}/users`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  /**
   * Método para eliminar un usuario por su ID.
   * @param userId ID del usuario a eliminar.
   * @returns Observable con la respuesta del backend.
   */
  deleteUser(userId: number): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('Unauthorized'));
    }

    return this.http.delete(`${environments.apiUrl}/users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  /**
   * Método para actualizar un usuario.
   * @param user Usuario actualizado.
   * @returns Observable con la respuesta del backend.
   */
  updateUser(user: any): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('Unauthorized'));
    }

    return this.http.put(`${environments.apiUrl}/users/${user.id}`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  /**
   * Método para crear un nuevo usuario.
   * @param user Nuevo usuario a crear.
   * @returns Observable con la respuesta del backend.
   */
  createUser(user: any): Observable<any> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('Unauthorized'));
    }

    return this.http.post(`${environments.apiUrl}/users`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
