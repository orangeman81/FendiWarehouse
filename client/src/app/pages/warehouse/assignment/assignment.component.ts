import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Stores } from 'src/app/models/data/stores';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/data/product';
import { switchMap, map, distinctUntilChanged, debounceTime, filter, startWith, tap } from 'rxjs/operators';
import { DataShape } from 'src/app/models/data/dataShape';
import { StateService } from 'src/app/providers/state.service';
import { MatStepper } from '@angular/material/stepper';
import { WarehouseService } from 'src/app/providers/warehouse.service';
import { Action } from 'src/app/models/store/action';
import { Actions } from 'src/app/models/store/actions.enum';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  storeForm: FormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);
  productForm: FormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);
  assigneeForm: FormGroup = new FormGroup({
    employee: new FormControl("", Validators.required),
    trackingNumber: new FormControl(null, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    cost: new FormControl(0),
    note: new FormControl("")
  })

  $stores: Observable<Stores[]>;
  $products: Observable<Product[]>;

  @ViewChild(MatStepper, { static: false })
  stepper !: MatStepper

  get userEmail() {
    return this.appState.userEmail
  }

  constructor(
    private store: WarehouseService,
    private appState: StateService
  ) { }

  ngOnInit() {
    this.$stores = this.storeForm.valueChanges
      .pipe(
        startWith(''),
        filter(() => this.storeForm.valid && typeof this.storeForm.value === "string"),
        distinctUntilChanged(),
        debounceTime(400),
        switchMap(query => this.store.$fetchStoresByName(query)
          .pipe(
            map((data: DataShape<any>) => {
              return data.content
            })
          ))
      )

    this.$products = this.productForm.valueChanges
      .pipe(
        startWith(''),
        filter(() => this.productForm.valid && typeof this.productForm.value === "string"),
        distinctUntilChanged(),
        debounceTime(400),
        switchMap(query => this.store.$fetchProductBySerial(query)
          .pipe(
            map((data: DataShape<any>) => {
              return data.content
            })
          ))
      )
  }

  displayName(item): string | undefined {
    return item ? item.name : null;
  }

  displayModel(item): string | undefined {
    return item ? item.model : null;
  }

  assign(): void {
    const params = {
      storeId: this.storeForm.value.id,
      productId: this.productForm.value.id,
      user: this.appState.userEmail,
      ...this.assigneeForm.value
    }
    this.store.dispatch(new Action(Actions.assign, params));
    this.appState.openSnackbar(this.productForm.value.model, "Assigned")
    this.stepper.reset();
  }

}
