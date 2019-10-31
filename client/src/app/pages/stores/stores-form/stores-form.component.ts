import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stores } from 'src/app/models/data/stores';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stores-form',
  templateUrl: './stores-form.component.html',
  styleUrls: ['./stores-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoresFormComponent {

  storesForm: FormGroup;
  title: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Stores,
    private dialogRef: MatDialogRef<StoresFormComponent>,
    private fb: FormBuilder
  ) {
    if (data == null) {
      this.storesForm = this.fb.group({
        name: ["", Validators.required],
        city: ["", Validators.required]
      });
      this.title = "Add Store";
    } else {
      this.storesForm = this.fb.group({
        name: [this.data.name, Validators.required],
        city: [this.data.city, Validators.required],
      });
      this.title = "Edit Store";
    }
  }

  save() {
    const form = this.storesForm.value;
    let payload = {
      ...this.data,
      ...form
    };
    this.dialogRef.close(this.data ? payload : form)
  }

  close() {
    this.dialogRef.close(null);
  }

}
