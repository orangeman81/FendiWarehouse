import { Action } from 'src/app/models/store/action';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from 'src/app/providers/state.service';
import { StateActions } from 'src/app/models/store/stateActions.enum';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, OnDestroy {

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.loading = true;
    this.state.dispatch(new Action(StateActions.callback, null));
  }

  ngOnDestroy() {
    this.state.loading = false;
  }

}
