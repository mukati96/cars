import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerViewComponent } from './dealer-view.component';

describe('DealerViewComponent', () => {
  let component: DealerViewComponent;
  let fixture: ComponentFixture<DealerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
