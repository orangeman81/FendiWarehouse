import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Movement } from '../models/data/movement';
import { DataState } from '../models/store/DataState';
import { Store } from '../models/store/store';
import { Observable } from 'rxjs';
import { switchMap, tap, pluck } from 'rxjs/operators';
import { Action } from '../models/store/action';

@Injectable()
export class MovementsService extends Store<DataState<Movement>> {

  url: string = "movements";

  constructor(private data: DataService) {
    super(new DataState<Movement>([], 0, 0, ""));
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
  get $data(): Observable<Movement[]> {
    return this.$state.pipe(pluck('data'));
  }
  get $total(): Observable<number> {
    return this.$state.pipe(pluck('total'));
  }
  get page(): number {
    return this.state.page;
  }

  $effects(): Observable<DataState<Movement>> {
    return this.$actions
      .pipe(
        switchMap((action: Action) => {
          return this.data.DataReducer<Movement>(action, this.state, this.url).pipe(tap(state => (this.state = state, console.log(`Movements updated`, state))));
        })
      )
  }
}
