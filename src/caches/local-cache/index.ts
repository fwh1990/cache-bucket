import {StorageCache} from "../../libraries/Storage";

export class LocalCache extends StorageCache
{
  protected getInstance(): Storage
  {
    return window.localStorage;
  }
}

export default new LocalCache();
