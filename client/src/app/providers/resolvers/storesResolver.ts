import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from 'src/app/models/data/product';
import { Observable, forkJoin } from 'rxjs';
import { StoresService } from '../stores.service';
import { Stores } from 'src/app/models/data/stores';
import { DataShape } from 'src/app/models/data/dataShape';

@Injectable()
export class StoresResolver implements Resolve<[Stores, DataShape<Product>]> {

  constructor(private store: StoresService) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> | Promise<any> | any {
    const id = route.params['id'];
    const stores: Observable<Stores> = this.store.$details(id);
    const products: Observable<DataShape<Product>> = this.store.$findProduct(id, 0);
    return forkJoin(stores, products);
  }
}