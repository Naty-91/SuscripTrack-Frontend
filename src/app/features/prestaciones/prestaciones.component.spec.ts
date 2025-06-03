import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesComponent } from './prestaciones.component';

describe('PrestacionesComponent', () => {
  let component: PrestacionesComponent;
  let fixture: ComponentFixture<PrestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
