import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimSliderComponent } from './trim-slider.component';

describe('TrimSliderComponent', () => {
  let component: TrimSliderComponent;
  let fixture: ComponentFixture<TrimSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
