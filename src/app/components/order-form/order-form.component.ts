import { Component } from '@angular/core';
import { OrderedPizzaComponent } from '../ordered-pizza/ordered-pizza.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, OrderedPizzaComponent]
})
export class OrderFormComponent {
  deliveryTime = '';
  deliveryAddress = '';
  paymentType = 'card';
  paymentNumber = '';

  cart = [
    // Esto luego se sustituirá con el carrito real
    { pizza: { title: 'Margarita', price: 8, image: '', ok_celiacs: true, ingredients: ['Tomate', 'Mozzarella'] }, quantity: 2 }
  ];

  placeOrder() {
    if (this.isValid()) {
      console.log('Pedido realizado:', {
        deliveryTime: this.deliveryTime,
        deliveryAddress: this.deliveryAddress,
        payment: { type: this.paymentType, number: this.paymentNumber },
        pizzas: this.cart
      });
    }
  }

  isValid() {
    const timeValid = /^\d{2}:\d{2}$/.test(this.deliveryTime);
    const addressValid = this.deliveryAddress.trim().length > 0;
    const paymentValid = this.paymentType === 'card'
      ? /^\d{16}$/.test(this.paymentNumber)
      : /^\d{9}$/.test(this.paymentNumber);

    return timeValid && addressValid && paymentValid;
  }
}
