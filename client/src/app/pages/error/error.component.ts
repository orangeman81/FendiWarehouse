import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { StateService } from 'src/app/providers/state.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  $message: Observable<string>;
  
  constructor(private store: StateService) {
    this.$message = this.store.$message;
  }

}
