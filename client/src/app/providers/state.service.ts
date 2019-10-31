import { Action } from '../models/store/action';
import { Store } from '../models/store/store';
import { AppState } from '../models/store/AppState';
import { Injectable } from '@angular/core';
import { switchMap, pluck, tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService extends Store<AppState> {

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private auth: AuthService,
    private data: DataService,
    private _snackBar: MatSnackBar
  ) {
    super(new AppState(
      null,
      false,
      "Welcome to Fendi warehouse, no user is logged in"
    ));
  }

  get $loading(): Observable<boolean> {
    return this.loading$.asObservable()
      .pipe(
        distinctUntilChanged(),
        debounceTime(1)
      );
  }
  set loading(val: boolean) {
    this.loading$.next(val);
  }
  // getters and setters
  get $loggedIn(): Observable<boolean> {
    return this.$state
      .pipe(pluck("loggedIn"));
  }
  get $isAthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }
  get $user(): Observable<any> {
    return this.$state
      .pipe(pluck("user"))
  }

  get $token(): Observable<any> {
    return this.auth.getToken$();
  }
  get userEmail() {
    return this.state.user.email;
  }
  get $message() {
    return this.$state
      .pipe(pluck("message"));
  }

  $effects(): Observable<AppState> {
    return this.$actions.pipe(
      switchMap((action: Action) => {
        return this.auth.AuthReducer(action, this.state)
          .pipe(
            tap(state => {
              this.state = state;
              this.openSnackbar(this.state.message, "Authentication");
            })
          );
      }),
    )
  }

  openSnackbar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  $getCout(status: string): Observable<any[]> {
    return this.data.$find(`products/count?status=${status}`)
  }

  $extract() {
    return this.data.$downloadFile()
      .pipe(
        tap(file => {
          const url = window.URL.createObjectURL(file);
          window.open(url);
          window.URL.revokeObjectURL(url);
        })
      )
  }

}