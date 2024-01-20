import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestaccountsComponent } from './guestaccounts.component';

describe('GuestaccountsComponent', () => {
  let component: GuestaccountsComponent;
  let fixture: ComponentFixture<GuestaccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestaccountsComponent]
    });
    fixture = TestBed.createComponent(GuestaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
