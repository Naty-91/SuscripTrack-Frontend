import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject , Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../app/core/services/auth.service';


Injectable()
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token'); // Obtiene el token

  // Clonar la solicitud solo si hay token
  const clonedReq = token 
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) 
    : req;

  // Pasar la solicitud al siguiente manejador
  return next(clonedReq);
}
