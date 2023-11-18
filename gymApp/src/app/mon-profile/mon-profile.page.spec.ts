import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonProfilePage } from './mon-profile.page';

describe('MonProfilePage', () => {
  let component: MonProfilePage;
  let fixture: ComponentFixture<MonProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
