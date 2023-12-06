import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroContentComponent } from './horo-content.component';

describe('HoroContentComponent', () => {
  let component: HoroContentComponent;
  let fixture: ComponentFixture<HoroContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoroContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoroContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
