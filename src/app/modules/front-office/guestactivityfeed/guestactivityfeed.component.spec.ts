import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestactivityfeedComponent } from './guestactivityfeed.component';

describe('GuestactivityfeedComponent', () => {
  let component: GuestactivityfeedComponent;
  let fixture: ComponentFixture<GuestactivityfeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestactivityfeedComponent]
    });
    fixture = TestBed.createComponent(GuestactivityfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
