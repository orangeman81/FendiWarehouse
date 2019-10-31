import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsFormComponent } from './params-form.component';

describe('ParamsFormComponent', () => {
  let component: ParamsFormComponent;
  let fixture: ComponentFixture<ParamsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
