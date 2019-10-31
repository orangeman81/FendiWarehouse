import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { SearchComponent } from './search/search.component';
import { ParamsFormComponent } from './params-form/params-form.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AllertComponent } from './allert/allert.component';

@NgModule({
  declarations: [SearchComponent, ParamsFormComponent, MainHeaderComponent, AllertComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule
  ],
  entryComponents: [
    ParamsFormComponent
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    SearchComponent,
    MainHeaderComponent,
    MatDividerModule
  ]
})
export class ComponentsModule { }
