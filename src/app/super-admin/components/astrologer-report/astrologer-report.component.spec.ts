import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologerReportComponent } from './astrologer-report.component';

describe('AstrologerReportComponent', () => {
  let component: AstrologerReportComponent;
  let fixture: ComponentFixture<AstrologerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstrologerReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrologerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
