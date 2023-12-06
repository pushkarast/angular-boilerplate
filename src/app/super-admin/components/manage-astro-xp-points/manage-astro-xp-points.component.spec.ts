import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAstroXpPointsComponent } from './manage-astro-xp-points.component';

describe('ManageAstroXpPointsComponent', () => {
  let component: ManageAstroXpPointsComponent;
  let fixture: ComponentFixture<ManageAstroXpPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAstroXpPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAstroXpPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
