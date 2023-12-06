import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroSignpredictionComponent } from './horo-signprediction.component';

describe('HoroSignpredictionComponent', () => {
  let component: HoroSignpredictionComponent;
  let fixture: ComponentFixture<HoroSignpredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoroSignpredictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoroSignpredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
