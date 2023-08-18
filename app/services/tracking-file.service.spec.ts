import { TestBed } from '@angular/core/testing';

import { TrackingFileService } from './tracking-file.service';

describe('TrackingFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackingFileService = TestBed.get(TrackingFileService);
    expect(service).toBeTruthy();
  });
});
