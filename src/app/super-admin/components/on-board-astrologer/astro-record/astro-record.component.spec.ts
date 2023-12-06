import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroRecordComponent } from './astro-record.component';

describe('AstroRecordComponent', () => {
  let component: AstroRecordComponent;
  let fixture: ComponentFixture<AstroRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
