import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-allert',
  templateUrl: './allert.component.html',
  styleUrls: ['./allert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllertComponent {

  message: string = "Are you sure?";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<AllertComponent>
  ) {
    this.message = this.data;
  }

  action(value: boolean) {
    this.dialogRef.close(value);
  }

}
