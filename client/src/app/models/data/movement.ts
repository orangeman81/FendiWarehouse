import { Product } from './product';

export interface Movement {
    id: number;
    date: string;
    note: string;
    type: string;
    trackingNumber: string;
    employee: string;
    user: string;
    shippingCost: number;
    technician: string;
    product: Product;
    status: string;
}