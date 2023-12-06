import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupportCategoryComponent } from './add-support-category.component';

describe('AddSupportCategoryComponent', () => {
  let component: AddSupportCategoryComponent;
  let fixture: ComponentFixture<AddSupportCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupportCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupportCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
