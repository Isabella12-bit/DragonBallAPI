import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarPersonajesComponent } from './revisar-personajes.component';

describe('RevisarPersonajesComponent', () => {
  let component: RevisarPersonajesComponent;
  let fixture: ComponentFixture<RevisarPersonajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisarPersonajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisarPersonajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
