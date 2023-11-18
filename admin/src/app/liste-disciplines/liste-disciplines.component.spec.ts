import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDisciplinesComponent } from './liste-disciplines.component';

describe('ListeDisciplinesComponent', () => {
  let component: ListeDisciplinesComponent;
  let fixture: ComponentFixture<ListeDisciplinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDisciplinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
