import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfuComponent } from './dfu.component';

describe('DfuComponent', () => {
  let component: DfuComponent;
  let fixture: ComponentFixture<DfuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
