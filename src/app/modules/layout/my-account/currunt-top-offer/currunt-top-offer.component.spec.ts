import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurruntTopOfferComponent } from './currunt-top-offer.component';

describe('CurruntTopOfferComponent', () => {
  let component: CurruntTopOfferComponent;
  let fixture: ComponentFixture<CurruntTopOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurruntTopOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurruntTopOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
