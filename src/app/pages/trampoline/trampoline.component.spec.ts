import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrampolineComponent } from './trampoline.component';

describe('TrampolineComponent', () => {
  let component: TrampolineComponent;
  let fixture: ComponentFixture<TrampolineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrampolineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrampolineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
