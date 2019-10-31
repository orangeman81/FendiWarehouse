import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovementsService } from 'src/app/providers/movements.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(private store: MovementsService) { }

  ngOnInit() {
    this.sub = this.store.$effects()
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
