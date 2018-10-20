# Introduction
Cache your data with TTL. Using this package in node.js and browser.

# Installation

By npm
```bash
npm install cache-bucket
```
Or by yarn
```bash
yarn add cache-bucket
```

# Support
## Node.js
**FileCache** and **MemoryCache** is enable. 

Notice that CacheFile will touch a file as storage. The default file path is: ./.filecache

```js
// Based on file
import {cache} from 'cache-bucket/file-cache';

// Based on memory
import {cache} from 'cache-bucket/memory-cache';
```
## Browser
**LocalCache** and **SessionCache** and **MemoryCache** is enable.

Notice that LocalCache is based on localStorage, and SessionCache is based on sessionStorage.

```js
// Based on memory
import {cache} from 'cache-bucket/memory-cache';

// Based on localStorage
import {cache} from 'cache-bucket/local-cache';

// Based on sessionStorage
import {cache} from 'cache-bucket/session-cache';
```

# Methods
### get(key: string, defaultValue?: any): any
Get your cache by key.

If cache is empty, defaultValue will be used. If parameter defaultValue is missing, method will respond `null`.

```
cache.get('foo'); // null
cache.get('foo', 'default-bar'); // default-bar
```

### set(key: string, value: any, duration?: number): void
Set cache data.

The parameter `value` type can be **string**, **number**, **object**, **array**. Cache data will expired after millSeconds when you provide duration.

```js
cache.set('foo', 'bar');
cache.set('obj', {pkg: 'cache-bucket'});

// Expired after 3 second.
cache.set('array', ['cache', 'bucket'], 3000);
```

### getOrSet(key: string, onEmpty: () => any, duration?: number): any

Get cache data. 

When cache data is missing, method will set data immediately. And then return it.

```js
cache.getOrSet('foo', () => {
  return 'bar';
}); // bar
```

### add(key: string, value: any, duration?: number): boolean
Set cache data when key is not exist.

```js
cache.add('foo', 'bar'); // true
cache.add('foo', 'new-bar'); // false
```

### remove(key: string): void
Delete a cache data.

```js
cache.remove('foo');
```

### clearExpired(): void

Clear all expired cache data

```js
cache.clearExpired();
```

### clearAll(): void

Clear all data.

```js
cache.clearAll();
```

# Advanced

### Multiply instances.

```js
import {MemoryCache} from 'cache-bucket/memory-cache';

const cache = new MemoryCache();

cache.set('foo', 'bar');
cache.get('foo'); // bar
```

```js
import {FileCache} from 'cache-bucket/file-cache';

const cache = new FileCache('./.new-cachefile');

cache.set('foo', 'bar');
cache.get('foo'); // bar
```