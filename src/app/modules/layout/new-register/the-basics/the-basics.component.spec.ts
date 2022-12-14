import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBasicsComponent } from './the-basics.component';

describe('TheBasicsComponent', () => {
  let component: TheBasicsComponent;
  let fixture: ComponentFixture<TheBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheBasicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
