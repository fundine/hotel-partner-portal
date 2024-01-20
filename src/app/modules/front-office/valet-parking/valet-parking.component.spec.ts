import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetParkingComponent } from './valet-parking.component';

describe('ValetParkingComponent', () => {
  let component: ValetParkingComponent;
  let fixture: ComponentFixture<ValetParkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValetParkingComponent]
    });
    fixture = TestBed.createComponent(ValetParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
