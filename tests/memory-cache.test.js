const {cache, MemoryCache} = require('../lib/memory-cache');
const {expect} = require('chai');
const commonTest = require('./common');

describe('Memory Cache', () => {
  beforeEach(() => {
    cache.clearAll();
  });

  commonTest(cache, MemoryCache);
});
