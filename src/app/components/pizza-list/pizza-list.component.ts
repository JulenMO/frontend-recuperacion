import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { PizzaCardComponent } from '../pizza-card/pizza-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  standalone: true,
  imports: [PizzaCardComponent, CommonModule]
})
export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];
  error = '';

  constructor(private pizzaService: PizzaService) { }

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
    console.log('Añadido al carrito:', event);
  }
}
