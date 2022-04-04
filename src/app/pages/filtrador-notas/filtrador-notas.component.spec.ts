import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradorNotasComponent } from './filtrador-notas.component';

describe('FiltradorNotasComponent', () => {
  let component: FiltradorNotasComponent;
  let fixture: ComponentFixture<FiltradorNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltradorNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltradorNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
