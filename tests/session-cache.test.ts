import {cache} from '../src/sesson-cache';
// @ts-ignore
import jsDomGlobal from 'jsdom-global';
import commonCacheTest from './common';

describe('SessionStorage Cache', () => {
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
