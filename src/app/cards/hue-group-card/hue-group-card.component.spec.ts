import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HueGroupCardComponent } from './hue-group-card.component';

describe('HueGroupCardComponent', () => {
  let component: HueGroupCardComponent;
  let fixture: ComponentFixture<HueGroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HueGroupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HueGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
