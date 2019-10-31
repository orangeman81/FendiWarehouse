import { ParamsFormComponent } from './../../../components/params-form/params-form.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WhFormComponent } from '../wh-form/wh-form.component';
import { WarehouseService } from 'src/app/providers/warehouse.service';
import { Actions } from 'src/app/models/store/actions.enum';
import { Action } from 'src/app/models/store/action';
import { Subscription, Observable } from 'rxjs';
import * as Select from '../../../models/data/wh.select';
import { QueryParams } from 'src/app/models/data/queryParams';
import { Product } from 'src/app/models/data/product';
import { MatPaginator } from '@angular/material/paginator';
import { StateService } from 'src/app/providers/state.service';
import { AllertComponent } from 'src/app/components/allert/allert.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  dialogS: Subscription;
  $dataSource: Observable<Product[]>;
  $total: Observable<number>;
  params: QueryParams = Select;
  // paginator 
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;


  constructor(
    private dialog: MatDialog,
    private store: WarehouseService,
    private appState: StateService
  ) {
  }

  ngOnInit() {
    // load data in the store and set loaded property to true
    this.store.dispatch(new Action(Actions.load, 0));
    // get data from store as observable
    this.$dataSource = this.store.$data;
    // get total from store as observable
    this.$total = this.store.$total;
    // get page actual index from store
    this.paginator.pageIndex = this.store.page;
  }

  changeQuery(query: string): void {
    // next call to BehaviourSubject
    this.store.query = query;
    // action dispatch to store
    this.store.dispatch(new Action(Actions.find, 0));
    // set paginator to first page after query is changed
    this.paginator.firstPage();
  }

  changePage($event): void {
    //page index from paginator
    const offset = $event.pageIndex;
    // action dispatch to store
    this.store.dispatch(new Action(Actions.find, offset));
  }

  openParams(): void {
    this.dialogS = this.dialog
      .open(ParamsFormComponent, { data: this.params, autoFocus: true })
      .afterClosed()
      .subscribe(params => {
        params === undefined ? params = "" : null;
        this.changeQuery(params);
      })
  }

  edit(payload) {
    this.dialogS = this.dialog
      .open(WhFormComponent, { data: payload, autoFocus: true })
      .afterClosed()
      .subscribe(payload => {
        payload != null ? this.store.dispatch(new Action(Actions.update, payload)) : null
      })
  }

  add() {
    this.dialogS = this.dialog
      .open(WhFormComponent, { autoFocus: true })
      .afterClosed()
      .subscribe(payload => {
        const results = {
          data: payload,
          user: this.appState.userEmail
        }
        payload != null ? this.store.dispatch(new Action(Actions.add, results)) : null;
      })
  }

  delete(payload) {
    this.dialogS = this.dialog
      .open(AllertComponent, { data: `deleting ${payload.model}` })
      .afterClosed()
      .subscribe(action => {
        action ? this.store.dispatch(new Action(Actions.delete, payload)) : null;
      })
  }

  unassign(payload) {
    this.dialogS = this.dialog
    .open(AllertComponent, { data: `Unassigning ${payload.model}` })
    .afterClosed()
    .subscribe(action => {
      const params = {
        productId: payload.id,
        user: this.appState.userEmail
      }
      action ? this.store.dispatch(new Action(Actions.unassign, params)) : null;
    })
  }

  ngOnDestroy() {
    this.dialogS ? this.dialogS.unsubscribe() : null;
  }

}