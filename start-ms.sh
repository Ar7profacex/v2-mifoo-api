#!/bin/bash
npm run update-migrations:run
# shellcheck disable=SC2105
npm run seed:run 2<&1 || break
npm run start:prod