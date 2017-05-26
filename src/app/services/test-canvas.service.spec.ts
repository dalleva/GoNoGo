import { TestBed, inject } from '@angular/core/testing';

import { TestCanvasService } from './test-canvas.service';

describe('TestCanvasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestCanvasService]
    });
  });

  it('should be created', inject([TestCanvasService], (service: TestCanvasService) => {
    expect(service).toBeTruthy();
  }));
});
