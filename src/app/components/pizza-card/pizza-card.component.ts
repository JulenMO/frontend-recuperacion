import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from '../../services/pizza.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, BrowserModule, FormsModule],
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent {
  @Input() pizza!: Pizza;
  @Output() addToCart = new EventEmitter<{ pizza: Pizza; quantity: number }>();
  quantity: number = 1;

  onAdd() {
    if (this.quantity > 0) this.addToCart.emit({ pizza: this.pizza, quantity: this.quantity });
    this.quantity = 1;
  }
}
