import {cache} from '../src/local-cache';
// @ts-ignore
import jsDomGlobal from 'jsdom-global';
import commonCacheTest from './common';

describe('LocalStorage Cache', () => {
  let cleanUp: () => void;

  before(() => {
    cleanUp = jsDomGlobal(undefined, {
      url: 'http://localhost',
    });
  });

  after(() => {
    cleanUp();
  });

  beforeEach(() => {
    cache.clearAll();
  });

  commonCacheTest(cache);
});
