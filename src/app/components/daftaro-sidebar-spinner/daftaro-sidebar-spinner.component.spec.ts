import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftaroSidebarSpinnerComponent } from './daftaro-sidebar-spinner.component';

describe('DaftaroSidebarSpinnerComponent', () => {
  let component: DaftaroSidebarSpinnerComponent;
  let fixture: ComponentFixture<DaftaroSidebarSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftaroSidebarSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftaroSidebarSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
