import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNotasComponent } from './info-notas.component';

describe('InfoNotasComponent', () => {
  let component: InfoNotasComponent;
  let fixture: ComponentFixture<InfoNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
