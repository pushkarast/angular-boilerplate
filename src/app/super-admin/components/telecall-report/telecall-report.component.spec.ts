import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecallReportComponent } from './telecall-report.component';

describe('TelecallReportComponent', () => {
  let component: TelecallReportComponent;
  let fixture: ComponentFixture<TelecallReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelecallReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelecallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
