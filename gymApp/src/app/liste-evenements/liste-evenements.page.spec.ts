import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEvenementsPage } from './liste-evenements.page';

describe('ListeEvenementsPage', () => {
  let component: ListeEvenementsPage;
  let fixture: ComponentFixture<ListeEvenementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEvenementsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEvenementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
