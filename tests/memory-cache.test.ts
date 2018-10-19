import {cache, MemoryCache} from '../src/memory-cache';
import {expect} from 'chai';
import commonCacheTest from './common';

describe('Memory Cache', () => {
  beforeEach(() => {
    cache.clearAll();
  });

  commonCacheTest(cache);

  it('should support multiply cache instance', () => {
    cache.set('hello', 'boy');
    expect(cache.get('hello')).to.equal('boy');

    const more = new MemoryCache();
    expect(more.get('hello')).to.be.null;
    more.set('hello', 'boy');
    expect(more.get('hello')).to.equal('boy');
  });
});
