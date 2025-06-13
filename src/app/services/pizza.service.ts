import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pizza {
  id: number;
  title: string;
  image: string;
  price: number;
  ok_celiacs: boolean;
  ingredients: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:3000/pizza';

  constructor(private http: HttpClient) { }

  getPizzas(name?: string, ingredients?: string[]): Observable<Pizza[]> {
    let params: any = {};
    if (name) params.name = name;
    if (ingredients) params.ingredients = ingredients.join(',');

    return this.http.get<Pizza[]>(this.apiUrl, { params });
  }
}
