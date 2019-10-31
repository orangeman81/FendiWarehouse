import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/data/product';
import { types, languages } from 'src/app/models/data/wh.select';

@Component({
  selector: 'app-wh-form',
  templateUrl: './wh-form.component.html',
  styleUrls: ['./wh-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhFormComponent {

  whForm: FormGroup;

  typesList: string[] = types;

  langList: string[] = languages;

  title: string;

  sub: Subscription;

  get type() {
    return this.whForm.get('type').value;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialogRef: MatDialogRef<WhFormComponent>,
    private fb: FormBuilder
  ) {
    if (data == null) {
      this.whForm = this.fb.group({
        type: ["", Validators.required],
        model: ["", Validators.required],
        producer: [""],
        serialNumber: ["", Validators.required],
        note: [""],
        value: [0],
        imei: [""],
        keyboard: [""]
      });
      this.title = "Add Product";
    } else {
      this.whForm = this.fb.group({
        type: [this.data.type, Validators.required],
        model: [this.data.model, Validators.required],
        producer: [this.data.producer],
        serialNumber: [this.data.serialNumber, Validators.required],
        note: [this.data.note],
        value: [this.data.value],
        imei: [this.data.imei],
        keyboard: [this.data.layoutKeyboard]
      });
      this.title = "Edit Product";
    }
  }

  save() {
    const form = this.whForm.value;
    let payload;
    if (this.data !== null) {
      const oldProduct = this.data;
      payload = {
        ...oldProduct,
        ...form
      }
    } else {
      payload = {
        ...form,
        status: "IN"
      }
    };

    this.dialogRef.close(payload)
  }

  close() {
    this.dialogRef.close(null);
  }

}
