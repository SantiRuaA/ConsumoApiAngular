import { TestBed } from '@angular/core/testing';

import { StarRoutingService } from './star-routing.service';

describe('StarRoutingService', () => {
  let service: StarRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
