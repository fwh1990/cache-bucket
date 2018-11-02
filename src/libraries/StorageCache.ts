import {Cache, CacheStoreItem} from './Cache';

export abstract class StorageCache extends Cache
{
  public static readonly KEY_STORE_KEY: string = 'diowiy(82197-09.89-8wqo8,9';
  protected readonly keysDict: Set<string>;

  constructor()
  {
    super();
    try {
      this.keysDict = new Set(JSON.parse(this.getInstance().getItem(StorageCache.KEY_STORE_KEY) || '[]'));
    } catch (e) {
      console.warn(e.message);
      this.keysDict = new Set([]);
    }
  }

  protected getValue(key: string): string | null
  {
    let value = this.getInstance().getItem(key);

    if (value === null) {
      return value;
    }

    const unSerializeValue: CacheStoreItem = JSON.parse(value);

    if (unSerializeValue.timeout !== 0 && unSerializeValue.timeout < Date.now()) {
      this.removeValue(key);
      return null;
    }

    return unSerializeValue.data;
  }

  protected setValue(key: string, value: string, duration?: number): void
  {
    const wrappedValue: CacheStoreItem = {
      timeout: duration === undefined ? 0 : Date.now() + duration,
      data: value,
    };

    this.getInstance().setItem(key, JSON.stringify(wrappedValue));
    this.keysDict.add(key);
    this.refreshDict();
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
    this.getInstance().removeItem(key);
    this.keysDict.delete(key);
    this.refreshDict();
  }

  protected clearExpiredKey(): void
  {
    const instance = this.getInstance();
    const now = Date.now();
    let changed = false;

    this.keysDict.forEach((key) => {
      const item = instance.getItem(key);

      if (item === null) {
        this.keysDict.delete(key);
        changed = true;
      } else {
        try {
          const unSerializeValue: CacheStoreItem = JSON.parse(item);

          if (unSerializeValue.timeout !== 0 && unSerializeValue.timeout < now) {
            instance.removeItem(key);
            this.keysDict.delete(key);
            changed = true;
          }
        } catch (e) {
          console.error(e.message);
        }
      }
    });

    if (changed) {
      this.refreshDict();
    }
  }

  protected clearAllKey(): void
  {
    this.getInstance().clear();
  }

  protected abstract getInstance(): Storage;

  private refreshDict(): void
  {
    this.getInstance().setItem(
      StorageCache.KEY_STORE_KEY,
      // Empty Set will respond '{}', but we need '[]'.
      JSON.stringify(this.keysDict.size ? this.keysDict : [])
    );
  }
}
