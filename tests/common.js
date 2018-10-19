const {expect} = require('chai');

module.exports = (cache, OrignalCache) => {
  it('should get null', () => {
    expect(cache.get('test')).to.be.null;
  });

  it('should set data successfully', () => {
    cache.set('number-demo', 20);
    expect(cache.get('number-demo'))
      .to.equal(20)
      .to.be.a('number');

    cache.set('string-demo', 'hi');
    expect(cache.get('string-demo')).to.equal('hi');

    cache.set('object-demo', {hi: 'man'});
    expect(cache.get('object-demo')).to.contain({hi: 'man'});

    cache.set('array-demo', ['hi', 'man', 'boom']);
    expect(cache.get('array-demo')).to.contain.members(['hi', 'man', 'boom']);
  });

  it('should remove data successfully', () => {
    cache.set('demo', 'ok');
    cache.remove('demo');
    expect(cache.get('demo')).to.be.null;
  });

  it('should not timeout', (done) => {
    cache.set('hi', 'man', 50);
    setTimeout(() => {
      expect(cache.get('hi')).to.equal('man');
      done();
    }, 40);
  });

  it('should be expired', (done) => {
    cache.set('hi', 'girl', 50);
    setTimeout(() => {
      expect(cache.get('hi')).to.be.null;
      done();
    }, 51);
  });

  it('should add data successfully, and deny others.', () => {
    expect(cache.add('hi', 'boy')).to.be.true;
    expect(cache.add('hi', 'man')).to.be.false;
    expect(cache.add('hello', 'boy')).to.be.true;
  });

  it('should replace data successfully.', (done) => {
    expect(cache.add('hi', 'boy', 30)).to.be.true;

    setTimeout(() => {
      expect(cache.add('hi', 'man')).to.be.false;
    }, 25);

    setTimeout(() => {
      expect(cache.add('hi', 'man')).to.be.true;
      done();
    }, 32);
  });

  it('should clear all data', () => {
    cache.set('hi', 'man');
    cache.set('hello', 'girl', 300);
    cache.add('demo', 'yes');

    cache.clearAll();
    expect(cache.get('hi')).to.be.null;
    expect(cache.get('hello')).to.be.null;
    expect(cache.get('demo')).to.be.null;
    expect(cache.get('other')).to.be.null;
  });
};
