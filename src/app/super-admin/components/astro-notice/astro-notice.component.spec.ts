import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroNoticeComponent } from './astro-notice.component';

describe('AstroNoticeComponent', () => {
  let component: AstroNoticeComponent;
  let fixture: ComponentFixture<AstroNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
