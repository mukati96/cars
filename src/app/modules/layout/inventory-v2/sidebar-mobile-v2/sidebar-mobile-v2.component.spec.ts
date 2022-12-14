import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMobileV2Component } from './sidebar-mobile-v2.component';

describe('SidebarMobileV2Component', () => {
  let component: SidebarMobileV2Component;
  let fixture: ComponentFixture<SidebarMobileV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarMobileV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMobileV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
