import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first, last, map, filter, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataState } from '../models/store/DataState';
import { Action } from '../models/store/action';
import { Actions } from '../models/store/actions.enum';
import { DataShape } from '../models/data/dataShape';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  $find(url: string) {
    return this.http.get<any>(this.apiUrl + url)
      .pipe(
        first()
      );
  }

  $add(url: string, payload: any) {
    return this.http.post<any>(this.apiUrl + url, payload)
      .pipe(
        last()
      );
  }

  $update(url: string, id: string, payload: any) {
    return this.http.put<any>(this.apiUrl + url + '/' + id, payload)
      .pipe(
        last()
      );
  }

  $delete(url: string, id: string) {
    return this.http.delete<any>(this.apiUrl + url + '/' + id)
      .pipe(
        last()
      );
  }

  $downloadFile(): Observable<any> {
    return this.http.get(this.apiUrl + 'products/downloadFile', { responseType: 'blob' })
      .pipe(
        last()
      );
  }

  DataReducer<T>(action: Action, state: DataState<T>, url: string, ): Observable<DataState<T>> {
    // payload from action
    const payload = action.payload;
    const $state = of(state);
    // action dispatcher
    switch (action.type) {
      case Actions.load: {
        const $load = this.$find(url + `?offset=${payload}`)
          .pipe(
            map((data: DataShape<T>) => {
              state = {
                ...state,
                data: data.content,
                total: data.totalElements,
                page: payload,
                loaded: true
              };
              return state;
            })
          )
        return $state.pipe(filter(state => !state.loaded), switchMap(state => $load))
      }
      case Actions.find: {
        const query = `?offset=${payload}` + state.query;
        return this.$find(url + query)
          .pipe(
            map((data: DataShape<T>) => {
              state = {
                ...state,
                data: data.content,
                total: data.totalElements,
                page: payload
              };
              return state;
            })
          )
      }
      case Actions.add: {
        let query: string = payload.user ? `?user=${payload.user}` : '';
        return this.$add(url + query, payload.data)
          .pipe(
            map(res => {
              const filteredData = state.data.filter((e, i) => i < 9);
              state = {
                ...state,
                data: [res, ...filteredData]
              }
              return state;
            })
          )
      }
      case Actions.update: {
        return this.$update(url + '/update', payload.id, payload)
          .pipe(
            map(() => {
              const filteredData: T[] = state.data.filter((e: any) => e.id != payload.id)
              state = {
                ...state,
                data: [payload, ...filteredData]
              }
              return state;
            })
          )
      }
      case Actions.delete: {
        return this.$update(url + '/delete', payload.id, payload)
          .pipe(
            map(() => {
              const filteredData: T[] = state.data.filter((e: any) => e.id !== payload.id)
              state = {
                ...state,
                data: filteredData
              }
              return state;
            })
          )
      }
      case Actions.assign: {
        return this.$add(`assignProduct`, payload)
          .pipe(
            map(() => {
              const filteredData: T[] = state.data.map((e: any) => {
                e.id === payload.productId
                  ? (e.status = 'OUT', e.dateAssignment = Date.now().toString())
                  : null;
                return e
              })
              state = {
                ...state,
                data: filteredData
              }
              return state;
            })
          );
      }
      case Actions.unassign: {
        return this.$add(`reAssignProduct`, payload)
          .pipe(
            map(() => {
              const filteredData: T[] = state.data.map((e: any) => {
                e.id === payload.productId ?
                  (e.status = 'IN', e.dateAssignment = null) :
                  null;
                return e
              })
              state = {
                ...state,
                data: filteredData
              }
              return state;
            })
          );
      }
      default: {
        return $state
      }
    }
  }

}
