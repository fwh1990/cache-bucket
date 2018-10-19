const {cache, SessionCache} = require('../lib/sesson-cache');
const jsDomGlobal = require('jsdom-global');
const {expect} = require('chai');
const commonTest = require('./common');

describe('SessionStorage Cache', () => {
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

  commonTest(cache, SessionCache);
});
