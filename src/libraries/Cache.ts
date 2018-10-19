import md5 from 'js-md5';

export interface CacheStoreItem {
  timeout: number;
  data: string;
}

interface DetermineWrappedValue {
  data: string | object | number;
}

export abstract class Cache
{
  public get(key: string, defaultValue?: any): any
  {
    let value = this.getValue(Cache.generateKey(key));

    if (value !== null) {
      const unSerializeValue: DetermineWrappedValue = JSON.parse(value);

      return unSerializeValue.data;
    }

    return defaultValue !== undefined ? defaultValue : value;
  }

  public getOrSet(key: string, onEmpty: () => any, duration?: number): any
  {
    let value = this.get(key);

    if (value === null) {
      value = onEmpty();
      this.set(key, value, duration);
    }

    return value;
  }

  public set(key: string, value: any, duration?: number): void
  {
    const wrappedValue: DetermineWrappedValue = {
      data: value,
    };

    return this.setValue(Cache.generateKey(key), JSON.stringify(wrappedValue), duration);
  }

  public add(key: string, value: any, duration?: number): boolean
  {
    const wrappedValue: DetermineWrappedValue = {
      data: value,
    };

    return this.addValue(Cache.generateKey(key), JSON.stringify(wrappedValue), duration);
  }

  public remove(key: string): void
  {
    return this.removeValue(Cache.generateKey(key));
  }

  public clearAll(): void
  {
    this.clearAllKey();
  }

  protected abstract getValue(key: string): string | null;

  protected abstract setValue(key: string, value: string, duration?: number): void;

  protected abstract addValue(key: string, value: string, duration?: number): boolean;

  protected abstract removeValue(key: string): void;

  protected abstract clearExpiredKey(): void;

  protected abstract clearAllKey(): void;

  private static generateKey(key: string): string
  {
    if (key.length < 32) {
      return md5(key);
    }

    return key;
  }
}
