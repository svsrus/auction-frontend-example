import { TestBed } from '@angular/core/testing';

import { AutomaticBidItemService } from './automatic-bid-item.service';

describe('AutomaticBidItemService', () => {
  let service: AutomaticBidItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomaticBidItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
