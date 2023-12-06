import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserwalletComponent } from './modify-userwallet.component';

describe('ModifyUserwalletComponent', () => {
  let component: ModifyUserwalletComponent;
  let fixture: ComponentFixture<ModifyUserwalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyUserwalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyUserwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
