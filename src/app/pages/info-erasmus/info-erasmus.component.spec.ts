import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoErasmusComponent } from './info-erasmus.component';

describe('InfoErasmusComponent', () => {
  let component: InfoErasmusComponent;
  let fixture: ComponentFixture<InfoErasmusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoErasmusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoErasmusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
