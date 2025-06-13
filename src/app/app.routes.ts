import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/pizza-list/pizza-list.component').then(m => m.PizzaListComponent)
    },
    {
        path: 'order',
        loadComponent: () =>
            import('./components/order-form/order-form.component').then(m => m.OrderFormComponent)
    },
];
