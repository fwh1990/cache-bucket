import {StorageCache} from "./libraries/StorageCache";

export class LocalCache extends StorageCache
{
  protected getInstance(): Storage
  {
    return window.localStorage;
  }
}

export const cache = new LocalCache();
