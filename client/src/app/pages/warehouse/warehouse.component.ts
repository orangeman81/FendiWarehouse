import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehouseService } from 'src/app/providers/warehouse.service';
import { RouterOutlet } from '@angular/router';
import { childAnimation } from 'src/app/components/animations';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
  animations: [
    childAnimation
  ]
})
export class WarehouseComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(private store: WarehouseService) { }

  ngOnInit() {
    this.sub = this.store.$effects()
      .subscribe(console.log);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['childanimation'];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
