import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocalTreinoComponent } from './new-local-treino.component';

describe('NewLocalTreinoComponent', () => {
  let component: NewLocalTreinoComponent;
  let fixture: ComponentFixture<NewLocalTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLocalTreinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLocalTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
