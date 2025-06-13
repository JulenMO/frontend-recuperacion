import { Component, OnInit } from '@angular/core';
import { Pizza, PizzaService } from '../../services/pizza.service';
import { PizzaCardComponent } from "../pizza-card/pizza-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
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
      error: err => {
        this.error = 'Error cargando pizzas.';
      }
    });
  }

  onAddToCart(event: { pizza: Pizza; quantity: number }) {
    // Por ahora solo consola, luego enviaremos a carrito/servicio
    console.log('Añadido al carrito:', event);
  }
}
