import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingredient {
  name: string;
  icon: string;
}

export interface Pizza {
  id: number;
  title: string;
  price: number;
  image: string;
  ok_celiacs: boolean;
  ingredients: Ingredient[];
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:3000/pizza';

  constructor(private http: HttpClient) { }

  getPizzas(nameFilter = '', ingredientsFilter = ''): Observable<Pizza[]> {
    let url = this.apiUrl;
    const params = [];
    if (nameFilter) params.push(`name=${nameFilter}`);
    if (ingredientsFilter) params.push(`ingredients=${ingredientsFilter}`);
    if (params.length > 0) url += '?' + params.join('&');
    return this.http.get<Pizza[]>(url);
  }
}
