import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateService } from '../state.service';
import { StateActions } from 'src/app/models/store/stateActions.enum';
import { Action } from 'src/app/models/store/action';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: StateService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.$isAthenticated
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.store.dispatch(new Action(StateActions.login, null))
          }
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.store.$isAthenticated
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.store.dispatch(new Action(StateActions.login, null))
          }
        })
      );
  }
}
