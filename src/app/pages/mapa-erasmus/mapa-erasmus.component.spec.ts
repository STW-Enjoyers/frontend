import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaErasmusComponent } from './mapa-erasmus.component';

describe('MapaErasmusComponent', () => {
  let component: MapaErasmusComponent;
  let fixture: ComponentFixture<MapaErasmusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaErasmusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaErasmusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
