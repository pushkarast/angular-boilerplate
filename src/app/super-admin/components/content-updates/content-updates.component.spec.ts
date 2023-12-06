import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUpdatesComponent } from './content-updates.component';

describe('ContentUpdatesComponent', () => {
  let component: ContentUpdatesComponent;
  let fixture: ComponentFixture<ContentUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
