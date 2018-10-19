const fs = require('fs');
const path = require('path');
const {cache, FileCache} = require('../lib/file-cache');
const {expect} = require('chai');
const commonTest = require('./common');

describe('File Cache', () => {
  const filePath = path.resolve(FileCache.FILE_PATH);

  before(() => {
    fs.unlinkSync(filePath);
  });

  beforeEach(() => {
    cache.clearAll();
  });

  commonTest(cache, FileCache);

  it('should exist cache file', () => {
    fs.unlinkSync(filePath);
    expect(fs.existsSync(filePath)).to.be.false;
    cache.set('hello', 'man');
    expect(fs.existsSync(filePath)).to.be.true;
  });

  after(() => {
    fs.unlinkSync(filePath);
  });
});
