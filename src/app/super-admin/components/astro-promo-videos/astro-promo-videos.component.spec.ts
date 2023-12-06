import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroPromoVideosComponent } from './astro-promo-videos.component';

describe('AstroPromoVideosComponent', () => {
  let component: AstroPromoVideosComponent;
  let fixture: ComponentFixture<AstroPromoVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroPromoVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroPromoVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
