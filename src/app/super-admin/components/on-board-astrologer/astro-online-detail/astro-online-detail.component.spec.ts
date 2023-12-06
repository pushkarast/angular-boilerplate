import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroOnlineDetailComponent } from './astro-online-detail.component';

describe('AstroOnlineDetailComponent', () => {
  let component: AstroOnlineDetailComponent;
  let fixture: ComponentFixture<AstroOnlineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroOnlineDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroOnlineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
