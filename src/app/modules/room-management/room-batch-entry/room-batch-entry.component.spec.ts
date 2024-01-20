import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBatchEntryComponent } from './room-batch-entry.component';

describe('RoomBatchEntryComponent', () => {
  let component: RoomBatchEntryComponent;
  let fixture: ComponentFixture<RoomBatchEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomBatchEntryComponent]
    });
    fixture = TestBed.createComponent(RoomBatchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
