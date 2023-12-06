import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserpermissionComponent } from './admin-userpermission.component';

describe('AdminUserpermissionComponent', () => {
  let component: AdminUserpermissionComponent;
  let fixture: ComponentFixture<AdminUserpermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserpermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
