import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageMembresComponent } from './pointage-membres.component';

describe('PointageMembresComponent', () => {
  let component: PointageMembresComponent;
  let fixture: ComponentFixture<PointageMembresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageMembresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
