import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CubismComponent } from './cubism.component';

describe('CubismComponent', () => {
  let component: CubismComponent;
  let fixture: ComponentFixture<CubismComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CubismComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
