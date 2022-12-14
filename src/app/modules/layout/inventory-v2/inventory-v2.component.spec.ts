import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryV2Component } from './inventory-v2.component';

describe('InventoryV2Component', () => {
  let component: InventoryV2Component;
  let fixture: ComponentFixture<InventoryV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
