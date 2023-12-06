import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundliComponent } from './kundli.component';

describe('KundliComponent', () => {
  let component: KundliComponent;
  let fixture: ComponentFixture<KundliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KundliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
