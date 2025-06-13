import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss'],
  standalone: true,
  imports: [CommonModule, BrowserModule, FormsModule]
})
export class PizzaCardComponent {
  @Input() pizza!: Pizza;
  @Output() addToCart = new EventEmitter<{ pizza: Pizza; quantity: number }>();
  quantity: number = 1;

  onAdd() {
    if (this.quantity > 0) {
      this.addToCart.emit({ pizza: this.pizza, quantity: this.quantity });
      this.quantity = 1;
    }
  }
}
