import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFeedbackComponent } from './order-feedback.component';

describe('OrderFeedbackComponent', () => {
  let component: OrderFeedbackComponent;
  let fixture: ComponentFixture<OrderFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFeedbackComponent]
    });
    fixture = TestBed.createComponent(OrderFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
