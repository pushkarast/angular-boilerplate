import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHComponent } from './video-h.component';

describe('VideoHComponent', () => {
  let component: VideoHComponent;
  let fixture: ComponentFixture<VideoHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
