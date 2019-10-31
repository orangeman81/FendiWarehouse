import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from './providers/state.service';
import { Subscription, Observable } from 'rxjs';
import { Action } from './models/store/action';
import { StateActions } from './models/store/stateActions.enum';
import { slideInAnimation } from './components/animations';
import { RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  fillerNav = [
    {
      link: "dashboard",
      label: "Dashboard"
    },
    {
      link: "stores",
      label: "Stores"
    },
    {
      link: "warehouse",
      label: "Warehouse"
    },
    {
      link: "movements",
      label: "Movements"
    },
    {
      link: "warehouse/assign",
      label: "Assign"
    }
  ]

  private sub: Subscription;
  private downloadS: Subscription;
  private userS: Subscription;
  public loggedIn: boolean;
  public user: any;
  public $loading: Observable<boolean>;

  constructor(private store: StateService) {
    this.$loading = this.store.$loading;
  }

  ngOnInit() {
    this.userS = this.store.$loggedIn
      .pipe(
        switchMap(loggedIn => {
          this.loggedIn = loggedIn;
          return this.store.$user;
        }),
      )
      .subscribe(user => this.user = user)

    this.sub = this.store.$effects()
      .subscribe(state => console.log(state));

    // to solve when we know what the problem is  
    this.store.dispatch(new Action(StateActions.refreshAuth, null));
  }

  download() {
    this.downloadS = this.store.$extract()
      .subscribe();
  }

  logout() {
    this.store.dispatch(new Action(StateActions.logout, null));
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.userS.unsubscribe();
    this.downloadS ? this.downloadS.unsubscribe() : null;
  }
}
