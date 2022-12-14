import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalPhotoNewComponent } from './vehical-photo-new.component';

describe('VehicalPhotoNewComponent', () => {
  let component: VehicalPhotoNewComponent;
  let fixture: ComponentFixture<VehicalPhotoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalPhotoNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalPhotoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
