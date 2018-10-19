import {StorageCache} from "../../libraries/Storage";

export class SessionCache extends StorageCache
{
  protected getInstance(): Storage
  {
    return window.sessionStorage;
  }
}

export default new SessionCache();
