import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSeancesPage } from './liste-seances.page';

describe('ListeSeancesPage', () => {
  let component: ListeSeancesPage;
  let fixture: ComponentFixture<ListeSeancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeSeancesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeSeancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
