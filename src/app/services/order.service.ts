import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../models/pizza.model';

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

export interface OrderRequest {
  pizzas: { pizza_id: number; quantity: number }[];
  delivery_time: string;
  delivery_address: string;
  payment: { payment_type: string; number: string };
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(pizza: Pizza, quantity: number) {
    if (quantity <= 0) return;
    const items = this.getCartItems();
    const index = items.findIndex(item => item.pizza.id === pizza.id);
    if (index !== -1) {
      items[index].quantity += quantity;
    } else {
      items.push({ pizza, quantity });
    }
    this.cartItemsSubject.next([...items]);
  }

  removeFromCart(pizzaId: number) {
    const items = this.getCartItems().filter(item => item.pizza.id !== pizzaId);
    this.cartItemsSubject.next([...items]);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  sendOrder(order: OrderRequest): Observable<any> {
    return this.http.post('/order', order);
  }
}
