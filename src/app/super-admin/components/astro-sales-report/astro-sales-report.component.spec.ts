import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroSalesReportComponent } from './astro-sales-report.component';

describe('AstroSalesReportComponent', () => {
  let component: AstroSalesReportComponent;
  let fixture: ComponentFixture<AstroSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroSalesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});