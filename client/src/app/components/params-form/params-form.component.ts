import { distinctUntilChanged, debounceTime, filter, auditTime, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { States } from 'src/app/models/data/states';
import { QueryParams } from 'src/app/models/data/queryParams';

@Component({
  selector: 'app-params-form',
  templateUrl: './params-form.component.html',
  styleUrls: ['./params-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParamsFormComponent implements OnInit {

  paramsForm = this.fb.group({
    type: [""],
    status: ["", Validators.required],
    serialNumber: [""],
    param: [""]
  });

  private queryControl = this.fb.control("", Validators.required);
  private keyboardControl = this.fb.control("");

  states: string[] = States;

  select: QueryParams = this.dataParams;

  private sub: Subscription;
  private paramsString: string;

  get type() {
    return this.paramsForm.get('type');
  }
  get param() {
    return this.paramsForm.get('param');
  }
  get isQuery(): boolean {
    return this.paramsForm.contains('query');
  }
  get isLaptop(): boolean {
    return this.paramsForm.contains('layoutKeyboard');
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public dataParams: QueryParams,
    private dialogRef: MatDialogRef<ParamsFormComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.sub = this.paramsForm.valueChanges
      .pipe(
        auditTime(100),
        tap(() => {
          if (!this.isQuery && this.param.dirty) {
            this.paramsForm.registerControl('query', this.queryControl);
          }
          if (this.type.value === "Laptop" && !this.isLaptop) {
            this.paramsForm.registerControl('layoutKeyboard', this.keyboardControl);
          }
          if (this.type.value != "Laptop" && this.isLaptop) {
            this.paramsForm.get('layoutKeyboard').patchValue('', { onlySelf: true, emitEvent: false })
            this.paramsForm.removeControl('layoutKeyboard');
          }
        }),
        distinctUntilChanged(),
        debounceTime(300),
        filter(() => this.paramsForm.valid)
      )
      .subscribe(() => {
        let results: string = "";
        const addResult = (result) => {
          results = results + result
        }
        const formData = Object.keys(this.paramsForm.value).filter(e => e != 'param' && e != 'query');
        formData.forEach(key => {
          const string: string = this.paramsForm.value[key] !== '' ?
            `&${key}=${this.paramsForm.value[key]}` :
            '';
          addResult(string)
        })
        this.isQuery ? addResult(`&${this.paramsForm.value.param}=${this.paramsForm.value.query}`) : null;
        this.paramsString = results;
      })
  }

  save() {
    this.dialogRef.close(this.paramsString)
  }

  close() {
    this.dialogRef.close('');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
