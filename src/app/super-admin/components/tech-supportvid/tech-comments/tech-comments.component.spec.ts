import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCommentsComponent } from './tech-comments.component';

describe('TechCommentsComponent', () => {
  let component: TechCommentsComponent;
  let fixture: ComponentFixture<TechCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
