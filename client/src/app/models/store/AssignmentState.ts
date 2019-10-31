import { Stores } from '../data/stores';
import { Product } from '../data/product';
import { DataShape } from '../data/dataShape';

export class AssignmentState {

    storeId: number;
    productId: number;
    stores: DataShape<Stores[]>;
    products: DataShape<Product[]>;
    query: string;

}