import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { States } from 'src/app/models/data/states';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  sub: Subscription;
  states: string[] = States;
  queryForm = new FormGroup({
    query: new FormControl(''),
    status: new FormControl('')
  });

  get query() {
    return this.queryForm.get('query').value;
  }
  set query(val: string) {
    this.queryForm.get('query').setValue(val);
  }

  reset() {
    this.query = "";
  }

  @Input()
  param: string = "serialNumber";

  @Input()
  status: boolean = true;

  @Input()
  withAction: boolean = true;

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  action: EventEmitter<boolean> = this.withAction ? new EventEmitter<boolean>() : null;

  ngOnInit() {
    this.sub = this.queryForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(600),
        map(form => {
          let queryParams: string = "";
          console.log(form)
          if (form.query != "") {
            queryParams = queryParams + `&${this.param}=${form.query}`
          }
          if (form.status != "") {
            queryParams = queryParams + `&status=${form.status}`
          }
          return queryParams;
        })
      )
      .subscribe(query => this.search.emit(query))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
