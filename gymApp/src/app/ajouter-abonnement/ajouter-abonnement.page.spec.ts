import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAbonnementPage } from './ajouter-abonnement.page';

describe('AjouterAbonnementPage', () => {
  let component: AjouterAbonnementPage;
  let fixture: ComponentFixture<AjouterAbonnementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterAbonnementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterAbonnementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
