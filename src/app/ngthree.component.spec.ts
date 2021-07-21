import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgThreeComponent } from './ngthree.component';

describe('NgThreeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NgThreeComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NgThreeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ngthree'`, () => {
    const fixture = TestBed.createComponent(NgThreeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ngthree');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NgThreeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ngthree app is running!');
  });
});
