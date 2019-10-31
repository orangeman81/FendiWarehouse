import { Action } from './../../models/store/action';
import { Component } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/providers/state.service';
import { StateActions } from 'src/app/models/store/stateActions.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  get $message(): Observable<string> {
    return this.store.$state
      .pipe(
        pluck('message')
      )
  }

  constructor(private store: StateService) { }

  login() {
    this.store.dispatch(new Action(StateActions.login, null))
  }

}
