import { OrderItem } from './order-item.model';
import { Payment } from './payment.model';

export interface Order {
    id?: number;
    pizzas: OrderItem[];
    delivery_time: string;
    delivery_address: string;
    payment: Payment;
}
