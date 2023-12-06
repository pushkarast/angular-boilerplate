import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologerRankingComponent } from './astrologer-ranking.component';

describe('AstrologerRankingComponent', () => {
  let component: AstrologerRankingComponent;
  let fixture: ComponentFixture<AstrologerRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstrologerRankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrologerRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
