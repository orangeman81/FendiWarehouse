import { Component, OnInit, ViewChild } from '@angular/core';
import { Stores } from 'src/app/models/data/stores';
import { Observable, Subscription } from 'rxjs';
import { StoresService } from 'src/app/providers/stores.service';
import { Action } from 'src/app/models/store/action';
import { Actions } from 'src/app/models/store/actions.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { StoresFormComponent } from '../stores-form/stores-form.component';
import { AllertComponent } from 'src/app/components/allert/allert.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dialogS: Subscription;
  $dataSource: Observable<Stores[]>;
  $total: Observable<number>;
  // paginator 
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private store: StoresService
  ) { }

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

  edit(payload) {
    this.dialogS = this.dialog
      .open(StoresFormComponent, { data: payload, autoFocus: true })
      .afterClosed()
      .subscribe(payload => {
        payload != null ? this.store.dispatch(new Action(Actions.update, payload)) : null
      })
  }

  add() {
    this.dialogS = this.dialog
      .open(StoresFormComponent, { autoFocus: true })
      .afterClosed()
      .subscribe(payload => {
        const results = {
          data: payload
        }
        payload != null ? this.store.dispatch(new Action(Actions.add, results)) : null
      })
  }

  delete(payload) {
    this.dialogS = this.dialog
      .open(AllertComponent, { data: `Deleting ${payload.name}` })
      .afterClosed()
      .subscribe(action => {
        action ? this.store.dispatch(new Action(Actions.delete, payload)) : null;
      })
  }

}
