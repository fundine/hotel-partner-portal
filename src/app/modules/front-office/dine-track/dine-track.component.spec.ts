import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DineTrackComponent } from './dine-track.component';

describe('DineTrackComponent', () => {
  let component: DineTrackComponent;
  let fixture: ComponentFixture<DineTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DineTrackComponent]
    });
    fixture = TestBed.createComponent(DineTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
