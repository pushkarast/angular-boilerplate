import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpRankingComponent } from './xp-ranking.component';

describe('XpRankingComponent', () => {
  let component: XpRankingComponent;
  let fixture: ComponentFixture<XpRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XpRankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XpRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
