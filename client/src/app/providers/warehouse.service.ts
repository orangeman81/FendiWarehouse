import { Injectable } from '@angular/core';
import { Store } from '../models/store/store';
import { DataState } from '../models/store/DataState';
import { switchMap, tap, map, first, pluck } from 'rxjs/operators';
import { Action } from '../models/store/action';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Product } from '../models/data/product';
import { Movement } from '../models/data/movement';
import { DataShape } from '../models/data/dataShape';
import { Stores } from '../models/data/stores';

@Injectable()
export class WarehouseService extends Store<DataState<Product>> {

  url: string = "products";

  constructor(private data: DataService) {
    super(new DataState<Product>([], 0, 0, "", false));
  }

  get loaded(): boolean {
    return this.state.loaded;
  }

  get query(): string {
    return this.state.query;
  }
  set query(val: string) {
    this.state = {
      ...this.state,
      query: val
    };
  }
  get $data(): Observable<Product[]> {
    return this.$state.pipe(pluck('data'));
  }
  get $total(): Observable<number> {
    return this.$state.pipe(pluck('total'));
  }
  get page(): number {
    return this.state.page;
  }

  $effects(): Observable<DataState<Product>> {
    return this.$actions
      .pipe(
        switchMap((action: Action) => {
          return this.data.DataReducer<Product>(action, this.state, this.url).pipe(tap(state => (this.state = state, console.log(`Warehouse updated`, state))));
        })
      )
  }

  // resolver and forms methods
  $details(id) {
    if (this.state.loaded) {
      return this.$state
        .pipe(
          map(state => state.data.find(e => e.id == id)),
          first()
        );
    } else {
      return this.data.$find(this.url + '/' + id);
    }
  }

  $fetchProductBySerial(serial): Observable<DataShape<DataShape<Product>>> {
    return this.data.$find(`products?status=IN&serialNumber=${serial}`);
  }

  $fetchStoresByName(name): Observable<DataShape<DataShape<Stores>>> {
    return this.data.$find(`stores?offset=0&name=${name}`);
  }

  $findMovementsByProduct(id, offset): Observable<DataShape<Movement>> {
    return this.data.$find(this.url + `/movements?offset=${offset}&productId=${id}`);
  }

}