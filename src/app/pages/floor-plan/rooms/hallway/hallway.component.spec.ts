import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallwayComponent } from './hallway.component';

describe('HallwayComponent', () => {
  let component: HallwayComponent;
  let fixture: ComponentFixture<HallwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
