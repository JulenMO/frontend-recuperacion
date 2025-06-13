import { Component, OnInit } from '@angular/core';
import { OrderService, CartItem, OrderRequest } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OrderFormComponent implements OnInit {
  cartItems: CartItem[] = [];
  delivery_time = '';
  delivery_address = '';
  payment_type = 'card';
  payment_number = '';
  errorMsg = '';
  successMsg = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get totalQuantity(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  validate(): boolean {
    this.errorMsg = '';
    if (this.cartItems.length === 0) {
      this.errorMsg = 'El carrito está vacío.';
      return false;
    }
    if (!this.delivery_time.match(/^\d{2}:\d{2}$/)) {
      this.errorMsg = 'Hora de entrega inválida. Usa formato HH:mm.';
      return false;
    }
    if (!this.delivery_address.trim()) {
      this.errorMsg = 'Dirección de entrega es obligatoria.';
      return false;
    }
    if (this.payment_type === 'card' && !this.payment_number.match(/^\d{16}$/)) {
      this.errorMsg = 'Número de tarjeta debe tener 16 dígitos.';
      return false;
    }
    if (this.payment_type === 'bizum' && !this.payment_number.match(/^\d{9}$/)) {
      this.errorMsg = 'Número de móvil Bizum debe tener 9 dígitos.';
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.validate()) return;
    const order: OrderRequest = {
      pizzas: this.cartItems.map(item => ({ pizza_id: item.pizza.id, quantity: item.quantity })),
      delivery_time: this.delivery_time,
      delivery_address: this.delivery_address,
      payment: { payment_type: this.payment_type, number: this.payment_number }
    };
    this.orderService.sendOrder(order).subscribe({
      next: _ => {
        this.successMsg = 'Pedido enviado con éxito.';
        this.orderService.clearCart();
        this.delivery_time = '';
        this.delivery_address = '';
        this.payment_number = '';
      },
      error: err => {
        this.errorMsg = 'Error al enviar el pedido.';
      }
    });
  }

  removeItem(pizzaId: number) {
    this.orderService.removeFromCart(pizzaId);
  }
}