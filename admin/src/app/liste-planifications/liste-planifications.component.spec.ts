import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePlanificationsComponent } from './liste-planifications.component';

describe('ListePlanificationsComponent', () => {
  let component: ListePlanificationsComponent;
  let fixture: ComponentFixture<ListePlanificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePlanificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePlanificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
