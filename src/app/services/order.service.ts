import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  pizza_id: number;
  quantity: number;
}

export interface Payment {
  payment_type: string;
  number: string;
}

export interface OrderRequest {
  pizzas: Order[];
  delivery_time: string;
  delivery_address: string;
  payment: Payment;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) { }

  createOrder(order: OrderRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
