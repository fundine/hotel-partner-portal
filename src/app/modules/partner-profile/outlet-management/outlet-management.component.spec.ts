import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletManagementComponent } from './outlet-management.component';

describe('OutletManagementComponent', () => {
  let component: OutletManagementComponent;
  let fixture: ComponentFixture<OutletManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutletManagementComponent]
    });
    fixture = TestBed.createComponent(OutletManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
