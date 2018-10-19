import {cache} from '../src/memory-cache';
import commonCacheTest from './common';

describe('Memory Cache', () => {
  beforeEach(() => {
    cache.clearAll();
  });

  commonCacheTest(cache);
});
