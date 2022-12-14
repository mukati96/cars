import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionAndHistoryComponent } from './condition-and-history.component';

describe('ConditionAndHistoryComponent', () => {
  let component: ConditionAndHistoryComponent;
  let fixture: ComponentFixture<ConditionAndHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionAndHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionAndHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
