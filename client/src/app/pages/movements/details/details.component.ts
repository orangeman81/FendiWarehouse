import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movement } from 'src/app/models/data/movement';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movement,
    private dialogRef: MatDialogRef<DetailsComponent>,
  ) { }

  close() {
    this.dialogRef.close(null);
  }

}
