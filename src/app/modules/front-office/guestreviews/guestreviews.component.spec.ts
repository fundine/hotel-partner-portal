import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestreviewsComponent } from './guestreviews.component';

describe('GuestreviewsComponent', () => {
  let component: GuestreviewsComponent;
  let fixture: ComponentFixture<GuestreviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestreviewsComponent]
    });
    fixture = TestBed.createComponent(GuestreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
