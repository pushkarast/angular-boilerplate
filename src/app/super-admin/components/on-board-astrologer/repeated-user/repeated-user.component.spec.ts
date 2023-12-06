import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedUserComponent } from './repeated-user.component';

describe('RepeatedUserComponent', () => {
  let component: RepeatedUserComponent;
  let fixture: ComponentFixture<RepeatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatedUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
