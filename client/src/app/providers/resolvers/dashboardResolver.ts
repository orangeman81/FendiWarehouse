import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { StateService } from '../state.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {
  constructor(private store: StateService) { }

  resolve(): Observable<any> | Promise<any> | any {
    return forkJoin(
      this.store.$getCout('ALL'),
      this.store.$getCout('IN'),
      this.store.$getCout('OUT')
    )
  }
}