#!/usr/bin/env bash

# shellcheck disable=SC1091

set -eu

CI_SCRIPTS_DIR=$(dirname "$0")/..

# shellcheck source=.gitlab-ci/scripts/lib/version-check.sh
source "$CI_SCRIPTS_DIR"/lib/version-check.sh

{
  echo _auth="$NPM_PUBLISH_TOKEN";
  echo email=diego@passbolt.com;
  echo always-auth=true
} >> .npmrc

if is_release_candidate "$CI_COMMIT_TAG"; then
  npm publish --tag next
else
  npm publish
fi