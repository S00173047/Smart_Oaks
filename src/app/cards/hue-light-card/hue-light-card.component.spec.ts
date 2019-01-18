import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HueLightCardComponent } from './hue-light-card.component';

describe('HueLightCardComponent', () => {
  let component: HueLightCardComponent;
  let fixture: ComponentFixture<HueLightCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HueLightCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HueLightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
