import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/order';

  constructor(private http: HttpClient) { }

  placeOrder(cart: CartItem[], deliveryTime: string, deliveryAddress: string, paymentType: string, paymentNumber: string): Observable<any> {
    const orderPayload = {
      pizzas: cart.map(item => ({
        pizza_id: item.pizza.id,
        quantity: item.quantity
      })),
      delivery_time: deliveryTime,
      delivery_address: deliveryAddress,
      payment: {
        payment_type: paymentType,
        number: paymentNumber
      }
    };
    return this.http.post(this.apiUrl, orderPayload);
  }
}
