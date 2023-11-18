import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAdherentsComponent } from './liste-adherents.component';

describe('ListeAdherentsComponent', () => {
  let component: ListeAdherentsComponent;
  let fixture: ComponentFixture<ListeAdherentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAdherentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAdherentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
