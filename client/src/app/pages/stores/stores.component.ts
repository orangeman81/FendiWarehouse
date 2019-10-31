import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoresService } from 'src/app/providers/stores.service';
import { RouterOutlet } from '@angular/router';
import { childAnimation } from 'src/app/components/animations';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  animations: [
    childAnimation
  ]
})
export class StoresComponent implements OnInit {

  sub: Subscription;

  constructor(private store: StoresService) { }

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
