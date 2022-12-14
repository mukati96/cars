import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalSubmitComponent } from './appraisal-submit.component';

describe('AppraisalSubmitComponent', () => {
  let component: AppraisalSubmitComponent;
  let fixture: ComponentFixture<AppraisalSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
