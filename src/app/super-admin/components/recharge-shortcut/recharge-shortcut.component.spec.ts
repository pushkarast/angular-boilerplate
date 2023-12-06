import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeShortcutComponent } from './recharge-shortcut.component';

describe('RechargeShortcutComponent', () => {
  let component: RechargeShortcutComponent;
  let fixture: ComponentFixture<RechargeShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeShortcutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
