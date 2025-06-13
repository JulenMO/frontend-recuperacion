import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem.model';
import { Pizza } from '../models/pizza.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  getCart(): CartItem[] {
    return this.items;
  }

  addToCart(pizza: Pizza, quantity: number): void {
    const existing = this.items.find(item => item.pizza.id === pizza.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ pizza, quantity });
    }
  }

  clearCart(): void {
    this.items = [];
  }
}
