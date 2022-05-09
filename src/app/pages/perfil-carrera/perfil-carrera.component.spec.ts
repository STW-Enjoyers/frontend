import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCarreraComponent } from './perfil-carrera.component';

describe('PerfilCarreraComponent', () => {
  let component: PerfilCarreraComponent;
  let fixture: ComponentFixture<PerfilCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
