import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomQuickAddComponent } from './room-quick-add.component';

describe('RoomQuickAddComponent', () => {
  let component: RoomQuickAddComponent;
  let fixture: ComponentFixture<RoomQuickAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomQuickAddComponent]
    });
    fixture = TestBed.createComponent(RoomQuickAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
