import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptIndexComponent } from './receipt-index.component';

describe('ReceiptIndexComponent', () => {
  let component: ReceiptIndexComponent;
  let fixture: ComponentFixture<ReceiptIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
