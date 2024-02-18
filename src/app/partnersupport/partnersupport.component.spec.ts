import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersupportComponent } from './partnersupport.component';

describe('PartnersupportComponent', () => {
  let component: PartnersupportComponent;
  let fixture: ComponentFixture<PartnersupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnersupportComponent]
    });
    fixture = TestBed.createComponent(PartnersupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
