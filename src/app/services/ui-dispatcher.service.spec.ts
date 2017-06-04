import { TestBed, inject } from '@angular/core/testing';

import { UiDispatcherService } from './ui-dispatcher.service';

describe('UiDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiDispatcherService]
    });
  });

  it('should be created', inject([UiDispatcherService], (service: UiDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
