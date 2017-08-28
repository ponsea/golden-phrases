import { TestBed, inject } from '@angular/core/testing';

import { PhraseConversionService } from './phrase-conversion.service';

describe('PhraseConversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhraseConversionService]
    });
  });

  it('should be created', inject([PhraseConversionService], (service: PhraseConversionService) => {
    expect(service).toBeTruthy();
  }));
});
