import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSeancePage } from './ajouter-seance.page';

describe('AjouterSeancePage', () => {
  let component: AjouterSeancePage;
  let fixture: ComponentFixture<AjouterSeancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterSeancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterSeancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
