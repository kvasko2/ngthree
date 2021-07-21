import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingCanvasComponent } from './scrolling-canvas.component';

describe('ScrollingCanvasComponent', () => {
  let component: ScrollingCanvasComponent;
  let fixture: ComponentFixture<ScrollingCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollingCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
