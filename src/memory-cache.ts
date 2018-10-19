import {Cache, CacheStoreItem} from "./libraries/Cache";

export class MemoryCache extends Cache
{
  protected cacheDict: Map<string, CacheStoreItem>;

  constructor()
  {
    super();
    this.cacheDict = new Map();
  }

  protected getValue(key: string): string | null
  {
    const value = this.cacheDict.get(key);

    if (value === undefined) {
      return null;
    }

    if (value.timeout !== 0 && value.timeout < Date.now()) {
      this.removeValue(key);
      return null;
    }

    return value.data;
  }

  protected setValue(key: string, value: string, duration?: number): void
  {
    this.cacheDict.set(key, {
      timeout: duration === undefined ? 0 : Date.now() + duration,
      data: value,
    });
  }

  protected addValue(key: string, value: string, duration?: number): boolean
  {
    const existValue = this.getValue(key);

    if (existValue === null) {
      this.setValue(key, value, duration);

      return true;
    }

    return false;
  }

  protected removeValue(key: string): void
  {
    this.cacheDict.delete(key);
  }

  protected clearExpiredKey(): void
  {
    const now = Date.now();

    this.cacheDict.forEach((value, key) => {
      if (value.timeout !== 0 && value.timeout < now) {
        this.cacheDict.delete(key);
      }
    });
  }

  protected clearAllKey(): void
  {
    this.cacheDict.clear();
  }
}

export const cache = new MemoryCache();
