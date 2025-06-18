import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarPersonajeComponent } from './aceptar-personaje.component';

describe('AceptarPersonajeComponent', () => {
  let component: AceptarPersonajeComponent;
  let fixture: ComponentFixture<AceptarPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptarPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
