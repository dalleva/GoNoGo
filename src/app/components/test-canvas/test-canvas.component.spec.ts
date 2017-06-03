import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCanvasComponent } from './test-canvas.component';
import { TestCanvasService } from 'app/services/test-canvas.service';

describe('TestCanvasComponent', () => {
  let component: TestCanvasComponent;
  let fixture: ComponentFixture<TestCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCanvasComponent ],
      providers: [TestCanvasService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
