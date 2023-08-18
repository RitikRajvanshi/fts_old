import { TestBed } from '@angular/core/testing';

import { PostServicesService } from './post-services.service';

describe('PostServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostServicesService = TestBed.get(PostServicesService);
    expect(service).toBeTruthy();
  });
});
