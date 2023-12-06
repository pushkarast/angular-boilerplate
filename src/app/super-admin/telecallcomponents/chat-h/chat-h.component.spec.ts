import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHComponent } from './chat-h.component';

describe('ChatHComponent', () => {
  let component: ChatHComponent;
  let fixture: ComponentFixture<ChatHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
