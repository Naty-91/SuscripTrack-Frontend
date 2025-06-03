import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environments.component';
import { AuthService } from './auth.service';

export interface Subscription {
  id?: number;
  userId: number;
  categoryId: number;
  cost: number;
  billingDate: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) throw new Error('Unauthorized');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAllByUser(userId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  create(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription, {
      headers: this.getHeaders(),
    });
  }

  update(subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/${subscription.id}`, subscription, {
      headers: this.getHeaders(),
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
