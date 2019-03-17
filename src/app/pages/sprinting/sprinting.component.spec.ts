import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintingComponent } from './sprinting.component';

describe('SprintingComponent', () => {
  let component: SprintingComponent;
  let fixture: ComponentFixture<SprintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
