import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePersonajeComponent } from './detalle-personaje.component';

describe('DetallePersonajeComponent', () => {
  let component: DetallePersonajeComponent;
  let fixture: ComponentFixture<DetallePersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
