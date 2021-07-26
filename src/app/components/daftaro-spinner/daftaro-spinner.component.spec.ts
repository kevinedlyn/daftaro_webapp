import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftaroSpinnerComponent } from './daftaro-spinner.component';

describe('DaftaroSpinnerComponent', () => {
  let component: DaftaroSpinnerComponent;
  let fixture: ComponentFixture<DaftaroSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftaroSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftaroSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
