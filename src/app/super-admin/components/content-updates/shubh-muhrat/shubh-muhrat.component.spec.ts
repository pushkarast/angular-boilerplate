import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShubhMuhratComponent } from './shubh-muhrat.component';

describe('ShubhMuhratComponent', () => {
  let component: ShubhMuhratComponent;
  let fixture: ComponentFixture<ShubhMuhratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShubhMuhratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShubhMuhratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
