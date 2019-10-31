import { Action } from './../../models/store/action';
import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, filter, map, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/store/AppState';
import { StateActions } from 'src/app/models/store/stateActions.enum';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthClientOptions = environment.auth0options;
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client(this.AuthClientOptions)
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated()))
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  constructor(private router: Router) { }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  private getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options)))
    );
  }

  public getToken$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

  private localAuthSetup(): Observable<any> {
    // This should only be called on app initialization
    // Set up local authentication streams
    return this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
  }

  private login(redirectPath: string = '/'): Observable<any> {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    return this.auth0Client$
      .pipe(
        tap((client: Auth0Client) => {
          // Call method to log in
          client.loginWithRedirect({
            redirect_uri: this.AuthClientOptions.redirect_uri,
            appState: { target: redirectPath }
          });
        })
      )
  }

  private handleAuthCallback(): Observable<any> {
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let targetRoute: string; // Path to redirect to after login processsed
    const authComplete$ = this.handleRedirectCallback$.pipe(
      // Have client, now call method to handle auth callback redirect
      tap(cbRes => {
        // Get and set target redirect route from callback results
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/callback';
      }),
      concatMap(() => {
        // Redirect callback complete; get user and login status
        return combineLatest(
          this.getUser$(),
          this.isAuthenticated$
        );
      })
    );
    // Subscribe to authentication completion observable
    // Response will be an array of user and login status
    return authComplete$
      .pipe(
        tap(() => {
          // Redirect to target route after callback processing
          this.router.navigate([targetRoute]);
        })
      )
  }

  private logout(): Observable<any> {
    // Ensure Auth0 client instance exists
    return this.auth0Client$
      .pipe(
        tap((client: Auth0Client) => {
          // Call method to log out
          client.logout({
            client_id: this.AuthClientOptions.client_id,
            returnTo: `${window.location.origin}` + environment.logoutRedirect
          });
        })
      )
  }

  public AuthReducer(action: Action, state: AppState): Observable<AppState> {
    // action dispatcher
    switch (action.type) {
      case StateActions.login: {
        return this.login();
      }
      case StateActions.logout: {
        return this.logout()
          .pipe(
            filter(() => state.loggedIn),
            tap(() => {
              localStorage.clear();
              state = {
                user: null,
                loggedIn: false,
                message: "User logged out"
              }
            }),
            map(() => state)
          );
      }
      case StateActions.callback: {
        return this.handleAuthCallback()
          .pipe(
            tap(res => {
              state = {
                user: res[0],
                loggedIn: res[1],
                message: "User logged in"
              }
            }),
            map(() => state)
          );
      }
      case StateActions.refreshAuth: {
        return this.localAuthSetup()
          .pipe(
            withLatestFrom(this.isAuthenticated$),
            filter(([user, logged]) => !!logged),
            map(([user, logged]) => {
              state = {
                user: user,
                loggedIn: true,
                message: "User logged in"
              };
              return state;
            }));
      }
      default: {
        return of(state);
      }
    }
  }

}