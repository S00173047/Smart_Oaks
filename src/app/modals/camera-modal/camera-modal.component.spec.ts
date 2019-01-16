import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraModalComponent } from './camera-modal.component';

describe('CameraModalComponent', () => {
  let component: CameraModalComponent;
  let fixture: ComponentFixture<CameraModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
