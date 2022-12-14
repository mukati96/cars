import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalFeaturesComponent } from './vehical-features.component';

describe('VehicalFeaturesComponent', () => {
  let component: VehicalFeaturesComponent;
  let fixture: ComponentFixture<VehicalFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
