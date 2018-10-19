#!/usr/bin/env bash

set -e

yarn run build
cp package.json README.md LICENSE ./lib/src/

old_registry=$(npm config get registry)
npm config set registry https://registry.npmjs.org
set +e
whoami=$(npm whoami 2>/dev/null)
set -e

if [ -z "$whoami" ]
then
   echo "login plz..."
   npm login
fi
echo "I am: $(npm whoami)"

sleep 1
echo "Begin publish..."
npm publish ./lib/src/

npm config set registry ${old_registry}
