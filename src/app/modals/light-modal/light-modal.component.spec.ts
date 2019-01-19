import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightModalComponent } from './light-modal.component';

describe('LightModalComponent', () => {
  let component: LightModalComponent;
  let fixture: ComponentFixture<LightModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
