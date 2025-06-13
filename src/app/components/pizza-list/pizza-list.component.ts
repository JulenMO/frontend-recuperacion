import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';
import { PizzaCardComponent } from "../pizza-card/pizza-card.component";
import { CommonModule } from '@angular/common';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  imports: [PizzaCardComponent, CommonModule]
})
export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];
  error = '';

  constructor(private pizzaService: PizzaService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.pizzaService.getPizzas().subscribe({
      next: data => {
        this.pizzas = data;
      },
      error: () => {
        this.error = 'Error cargando pizzas.';
      }
    });
  }

  onAddToCart(event: { pizza: Pizza; quantity: number }) {
    this.cartService.addToCart(event.pizza, event.quantity);
  }
}
