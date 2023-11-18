import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDisciplinesComponent } from './ajouter-disciplines.component';

describe('AjouterDisciplinesComponent', () => {
  let component: AjouterDisciplinesComponent;
  let fixture: ComponentFixture<AjouterDisciplinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterDisciplinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
