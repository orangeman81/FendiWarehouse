import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '../models/store/action';
import { tap, switchMap, map, first, pluck } from 'rxjs/operators';
import { Store } from '../models/store/store';
import { DataService } from './data.service';
import { DataState } from '../models/store/DataState';
import { Stores } from '../models/data/stores';
import { Product } from '../models/data/product';
import { DataShape } from '../models/data/dataShape';

@Injectable()
export class StoresService extends Store<DataState<Stores>>  {

  url: string = "stores";

  constructor(private data: DataService) {
    super(new DataState(null, 0, 0, ""))
  }

  get query(): string {
    return this.state.query;
  }
  set query(val: string) {
    this.state = {
      ...this.state,
      query: val
    }
  }
  get $data(): Observable<Stores[]> {
    return this.$state.pipe(pluck('data'))
  }
  get $total(): Observable<number> {
    return this.$state.pipe(pluck('total'))
  }
  get page(): number {
    return this.state.page;
  }

  $effects(): Observable<DataState<Stores>> {
    return this.$actions
      .pipe(
        switchMap((action: Action) => {
          return this.data.DataReducer<Stores>(action, this.state, this.url).pipe(tap(state => (this.state = state, console.log(`Stores updated`, state))));
        })
      )
  }

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

  $findProduct(id, offset): Observable<DataShape<Product>> {
    return this.data.$find(`stores/products?offset=${offset}&storeId=${id}`);
  }

}
