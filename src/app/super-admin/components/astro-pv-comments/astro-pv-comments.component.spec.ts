import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroPvCommentsComponent } from './astro-pv-comments.component';

describe('AstroPvCommentsComponent', () => {
  let component: AstroPvCommentsComponent;
  let fixture: ComponentFixture<AstroPvCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroPvCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroPvCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
