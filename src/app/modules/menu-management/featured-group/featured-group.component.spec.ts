import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedGroupComponent } from './featured-group.component';

describe('FeaturedGroupComponent', () => {
  let component: FeaturedGroupComponent;
  let fixture: ComponentFixture<FeaturedGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedGroupComponent]
    });
    fixture = TestBed.createComponent(FeaturedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
