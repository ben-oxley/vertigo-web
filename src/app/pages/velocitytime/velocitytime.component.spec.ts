import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocitytimeComponent } from './velocitytime.component';

describe('VelocitytimeComponent', () => {
  let component: VelocitytimeComponent;
  let fixture: ComponentFixture<VelocitytimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VelocitytimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocitytimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
