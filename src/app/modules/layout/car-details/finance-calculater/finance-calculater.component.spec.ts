import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCalculaterComponent } from './finance-calculater.component';

describe('FinanceCalculaterComponent', () => {
  let component: FinanceCalculaterComponent;
  let fixture: ComponentFixture<FinanceCalculaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceCalculaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceCalculaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
