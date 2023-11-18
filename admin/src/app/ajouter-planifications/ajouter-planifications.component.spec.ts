import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPlanificationsComponent } from './ajouter-planifications.component';

describe('AjouterPlanificationsComponent', () => {
  let component: AjouterPlanificationsComponent;
  let fixture: ComponentFixture<AjouterPlanificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterPlanificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPlanificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
