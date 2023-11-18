import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAbonnementsPage } from './liste-abonnements.page';

describe('ListeAbonnementsPage', () => {
  let component: ListeAbonnementsPage;
  let fixture: ComponentFixture<ListeAbonnementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAbonnementsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAbonnementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
