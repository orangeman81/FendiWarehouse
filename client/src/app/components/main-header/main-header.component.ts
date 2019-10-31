import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  host: { 'class': 'mat-elevation-z2' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {

  @Input()
  title: string;

  @Input()
  subtitle: string;

}