import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Stores } from 'src/app/models/data/stores';
import { Product } from 'src/app/models/data/product';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { StoresService } from 'src/app/providers/stores.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  sub: Subscription;
  details: Stores;
  products: Product[];
  total: number;
  constructor(private route: ActivatedRoute, private store: StoresService) { }

  ngOnInit() {
    this.sub = this.route.data
      .pipe(
        pluck('details')
      )
      .subscribe(resolver => {
        this.details = resolver[0];
        this.products = resolver[1].content;
        this.total = resolver[1].totalElements;
      })
  }
  
  changePage($event): void {
    //page index from paginator
    const offset = $event.pageIndex;
    // action dispatch to store
    this.sub = this.store.$findProduct(this.route.snapshot.params['id'], offset)
      .subscribe(res => {
        this.products = res.content;
        this.total = res.totalElements;
      });
  }  

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
