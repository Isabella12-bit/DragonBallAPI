import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPersonajeComponent } from './agregar-personaje.component';

describe('AgregarPersonajeComponent', () => {
  let component: AgregarPersonajeComponent;
  let fixture: ComponentFixture<AgregarPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
