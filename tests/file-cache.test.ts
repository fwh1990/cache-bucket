import fs from 'fs';
import path from 'path';
import {cache, FileCache} from '../src/file-cache';
import {expect} from 'chai';
import commonCacheTest from './common';

describe('File Cache', () => {
  const filePath = path.resolve(FileCache.FILE_PATH);

  before(() => {
    fs.unlinkSync(filePath);
  });

  beforeEach(() => {
    cache.clearAll();
  });

  commonCacheTest(cache);

  it('should exist cache file', () => {
    fs.unlinkSync(filePath);
    expect(fs.existsSync(filePath)).to.be.false;
    cache.set('hello', 'man');
    expect(fs.existsSync(filePath)).to.be.true;
  });

  it('should create another cache file', () => {
    const testPath = path.resolve('./test-filecache');
    expect(fs.existsSync(testPath)).to.be.false;
    const testCache = new FileCache(testPath);
    expect(fs.existsSync(testPath)).to.be.true;

    testCache.set('test', 'ok');
    expect(testCache.get('test')).to.equal('ok');

    fs.unlinkSync(testPath);
  });

  it('should load data from file', () => {
    const testPath = path.resolve('./test-filecache');
    fs.writeFileSync(testPath, '[["5d41402abc4b2a76b9719d911017c592",{"timeout":0,"data":"{\\"data\\":\\"man\\"}"}]]');
    expect(fs.existsSync(testPath)).to.be.true;
    const testCache = new FileCache(testPath);

    expect(testCache.get('hello')).to.equal('man');
    fs.unlinkSync(testPath);
  });

  after(() => {
    fs.unlinkSync(filePath);
  });
});
