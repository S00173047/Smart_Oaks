import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaireBedroomComponent } from './daire-bedroom.component';

describe('DaireBedroomComponent', () => {
  let component: DaireBedroomComponent;
  let fixture: ComponentFixture<DaireBedroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaireBedroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaireBedroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
