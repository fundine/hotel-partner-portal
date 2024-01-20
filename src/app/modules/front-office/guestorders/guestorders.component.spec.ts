import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestordersComponent } from './guestorders.component';

describe('GuestordersComponent', () => {
  let component: GuestordersComponent;
  let fixture: ComponentFixture<GuestordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestordersComponent]
    });
    fixture = TestBed.createComponent(GuestordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
