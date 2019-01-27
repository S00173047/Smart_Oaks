import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SittingRoomComponent } from './sitting-room.component';

describe('SittingRoomComponent', () => {
  let component: SittingRoomComponent;
  let fixture: ComponentFixture<SittingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SittingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SittingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
