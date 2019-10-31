import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AllertComponent } from 'src/app/components/allert/allert.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  sub: Subscription;
  prodAll: any[];
  prodIn: any[];
  prodOut: any[];

  view: any[] = [600, undefined];

  colors = {
    domain: ['#fdd835', '#fbc02d', '#ffeb3b', '#d500f9', '#7b1fa2',]
  }

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sub = this.route.data
      .pipe(
        pluck('count')
      )
      .subscribe(res => (this.prodAll = res[0], this.prodIn = res[1], this.prodOut = res[2]))
  }

  details(payload) {
    this.dialog.open(AllertComponent, { data: `${payload.name}: ${payload.value}` })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
