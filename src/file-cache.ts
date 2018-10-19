import fs from 'fs';
import path from 'path';
import {MemoryCache} from './memory-cache';
import {CacheStoreItem} from "./libraries/Cache";

export class FileCache extends MemoryCache
{
  protected readonly fileName: string;

  constructor(filePath: string = './.filecache', mode: string = '0600')
  {
    super();
    this.fileName = path.resolve(filePath);

    if (fs.existsSync(this.fileName)) {
      this.cacheDict = new Map<string, CacheStoreItem>(JSON.parse(fs.readFileSync(this.fileName).toString() || '[]'));
    } else {
      // try the access of path.
      fs.appendFileSync(this.fileName, '[]', {mode});
    }
  }

  protected setValue(key: string, value: string, duration?: number): void
  {
    super.setValue(key, value, duration);
    this.refreshFile();
  }

  protected removeValue(key: string): void
  {
    super.removeValue(key);
    this.refreshFile();
  }

  protected clearExpiredKey(): void
  {
    const originalSize = this.cacheDict.size;

    super.clearExpiredKey();

    if (originalSize !== this.cacheDict.size) {
      this.refreshFile();
    }
  }

  protected clearAllKey(): void
  {
    super.clearAllKey();
    this.refreshFile();
  }

  private refreshFile(): void
  {
    fs.writeFileSync(this.fileName, JSON.stringify([...this.cacheDict]));
  }
}

export const cache = new FileCache();
