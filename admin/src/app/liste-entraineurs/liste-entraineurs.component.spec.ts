import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEntraineursComponent } from './liste-entraineurs.component';

describe('ListeEntraineursComponent', () => {
  let component: ListeEntraineursComponent;
  let fixture: ComponentFixture<ListeEntraineursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEntraineursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEntraineursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
