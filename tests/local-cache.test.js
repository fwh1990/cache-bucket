const {cache, LocalCache} = require('../lib/local-cache');
const jsDomGlobal = require('jsdom-global');
const {expect} = require('chai');
const commonTest = require('./common');

describe('LocalStorage Cache', () => {
  before(() => {
    this.jsdomCleanUp = jsDomGlobal(undefined, {
      url: 'http://localhost',
    });
  });

  after(() => {
    this.jsdomCleanUp();
  });

  beforeEach(() => {
    cache.clearAll();
  });

  commonTest(cache, LocalCache);
});
