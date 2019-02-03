import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermostatCardComponent } from './thermostat-card.component';

describe('ThermostatCardComponent', () => {
  let component: ThermostatCardComponent;
  let fixture: ComponentFixture<ThermostatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermostatCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermostatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
