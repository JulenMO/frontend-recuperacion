import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordered-pizza',
  templateUrl: './ordered-pizza.component.html',
  styleUrls: ['./ordered-pizza.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderedPizzaComponent {
  @Input() pizza: any;
  @Input() quantity: number = 1;
}
