import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEntraineursComponent } from './ajouter-entraineurs.component';

describe('AjouterEntraineursComponent', () => {
  let component: AjouterEntraineursComponent;
  let fixture: ComponentFixture<AjouterEntraineursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterEntraineursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEntraineursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
