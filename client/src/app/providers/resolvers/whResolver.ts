import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from 'src/app/models/data/product';
import { Movement } from 'src/app/models/data/movement';
import { WarehouseService } from '../warehouse.service';
import { Observable, forkJoin } from 'rxjs';
import { DataShape } from 'src/app/models/data/dataShape';

@Injectable()
export class whResolver implements Resolve<[Product, Movement[]]> {
  constructor(private store: WarehouseService) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    const product: Observable<Product> = this.store.$details(id);
    const movements: Observable<DataShape<Movement>> = this.store.$findMovementsByProduct(id, 0);
    return forkJoin(product, movements);
  }
}