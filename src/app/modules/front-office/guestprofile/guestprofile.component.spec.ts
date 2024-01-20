import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestprofileComponent } from './guestprofile.component';

describe('GuestprofileComponent', () => {
  let component: GuestprofileComponent;
  let fixture: ComponentFixture<GuestprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestprofileComponent]
    });
    fixture = TestBed.createComponent(GuestprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
