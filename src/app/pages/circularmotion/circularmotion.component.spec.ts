import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularmotionComponent } from './circularmotion.component';

describe('CircularmotionComponent', () => {
  let component: CircularmotionComponent;
  let fixture: ComponentFixture<CircularmotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularmotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularmotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
