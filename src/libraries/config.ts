import fs from 'fs';
import path from 'path';

let config = {
  "defaultFilePath": "./.filecache"
};

const configFilePath = path.resolve('cache-bucket.json');

if (fs.existsSync(configFilePath)) {
  config = {
    ...config,
    ...require(configFilePath),
  };
}

export {
  config,
};
