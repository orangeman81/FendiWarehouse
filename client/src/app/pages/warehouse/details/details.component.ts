import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/data/product';
import { Movement } from 'src/app/models/data/movement';
import { pluck } from 'rxjs/operators';
import { WarehouseService } from 'src/app/providers/warehouse.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  sub: Subscription;
  details: Product;
  total: number;
  movements: Movement[];
  constructor(private route: ActivatedRoute, private store: WarehouseService) { }

  ngOnInit() {
    this.sub = this.route.data
      .pipe(
        pluck('details')
      )
      .subscribe(resolver => {
        this.details = resolver[0];
        this.movements = resolver[1].content;
        this.total = resolver[1].totalElements;
      })
  }

  changePage($event): void {
    //page index from paginator
    const offset = $event.pageIndex;
    // action dispatch to store
    this.sub = this.store.$findMovementsByProduct(this.route.snapshot.params['id'], offset)
      .subscribe(res => {
        this.movements = res.content;
        this.total = res.totalElements;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
