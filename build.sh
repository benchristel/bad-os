#!/bin/bash

set -e # stop immediately on error

shopt -s extglob # enable !(...) syntax to exclude files from paths

# Run the tests
mkdir -p .build
cat src/!(main).js spec/*.js > .build/allSpecs.js
jasmine .build/allSpecs.js

# If the tests pass, build the distribution files
cat src/!(main).js src/main.js > dist/boot.js
cp README.md dist/README.md
