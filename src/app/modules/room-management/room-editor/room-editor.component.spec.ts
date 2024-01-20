import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditorComponent } from './room-editor.component';

describe('RoomEditorComponent', () => {
  let component: RoomEditorComponent;
  let fixture: ComponentFixture<RoomEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomEditorComponent]
    });
    fixture = TestBed.createComponent(RoomEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
