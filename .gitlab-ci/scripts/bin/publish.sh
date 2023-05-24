#!/usr/bin/env bash

# shellcheck disable=SC1091

set -eu

CI_SCRIPTS_DIR=$(dirname "$0")/..

# shellcheck source=.gitlab-ci/scripts/lib/version-check.sh
source "$CI_SCRIPTS_DIR"/lib/version-check.sh

echo //registry.npmjs.com/:_authToken="$NPM_PUBLISH_TOKEN" > .npmrc
echo email=diego@passbolt.com >> .npmrc
echo always-auth=true >> .npmrc

if is_release_candidate "$CI_COMMIT_TAG"; then
  npm publish --tag next
else
  npm publish
fi