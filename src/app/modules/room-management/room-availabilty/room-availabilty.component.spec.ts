import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvailabiltyComponent } from './room-availabilty.component';

describe('RoomAvailabiltyComponent', () => {
  let component: RoomAvailabiltyComponent;
  let fixture: ComponentFixture<RoomAvailabiltyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomAvailabiltyComponent]
    });
    fixture = TestBed.createComponent(RoomAvailabiltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
