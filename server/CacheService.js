import NodeCache from 'node-cache';

class Cache {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key) {
      const value = this.cache.get(key);

      if (value) {
          console.log('cache hit!')
          return value;
      }

      console.log('cache miss');
  }

  set(key, val) {
    console.log('setting cache');
    return this.cache.set(key, val, 10000);
  }

  del(keys) {
    this.cache.del(keys);
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }
}

export default Cache;
