import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchEntryComponent } from './batch-entry.component';

describe('BatchEntryComponent', () => {
  let component: BatchEntryComponent;
  let fixture: ComponentFixture<BatchEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchEntryComponent]
    });
    fixture = TestBed.createComponent(BatchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
