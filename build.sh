#!/bin/bash -e

mkdir -p .build-tmp

cat \
  $(find src -name '*.js') \
  $(find test -name '*.js') \
> .build-tmp/test.js

jasmine .build-tmp/test.js

cat \
  $(find src -name '*.js') \
  main.js \
> boot.js
