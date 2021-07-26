import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerifiedComponent } from './phone-verified.component';

describe('PhoneVerifiedComponent', () => {
  let component: PhoneVerifiedComponent;
  let fixture: ComponentFixture<PhoneVerifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
