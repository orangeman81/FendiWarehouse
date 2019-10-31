import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Movement } from 'src/app/models/data/movement';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MovementsService } from 'src/app/providers/movements.service';
import { Action } from 'src/app/models/store/action';
import { Actions } from 'src/app/models/store/actions.enum';
import { tap, pluck } from 'rxjs/operators';
import { DetailsComponent } from './../details/details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  $dataSource: Observable<Movement[]>;
  $total: Observable<number>;
  // paginator 
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;


  constructor(
    private dialog: MatDialog,
    private store: MovementsService
  ) { }

  ngOnInit() {
     // movements are refreshed each time couse we have no details page,
     // list does not updates on new assignment so loaded is never set true.
     // ********************************************************************
     this.store.dispatch(new Action(Actions.find, this.store.page));
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

  openDetail(payload) {
    // open details dialog
    this.dialog.open(DetailsComponent, { data: payload, autoFocus: true })
  }
}
