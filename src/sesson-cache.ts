import {StorageCache} from "./libraries/StorageCache";

export class SessionCache extends StorageCache
{
  protected getInstance(): Storage
  {
    return window.sessionStorage;
  }
}

export const cache = new SessionCache();
