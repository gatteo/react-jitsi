#!/bin/bash
set -e

if [ -z "$1" ]
  then
    echo "Wrong usage : "
    echo "The current latest version in CHANGELOG.md should be given as input"
    echo "Example : ./scripts/check-package-version.sh 1.0.0"
    exit 1
fi

CHANGELOG_VERSION=$1

LAST_TAG_PUBLISHED_NPM=$(npm view @ivicos/react-jitsi version)
CURRENT_VERSION_NPM=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Check if the version indicated in package.json corresponds to the one given in CHANGELOG
if [[ $CURRENT_VERSION_NPM != $CHANGELOG_VERSION ]]; then
    echo "The version indicated in package.json '$CURRENT_VERSION_NPM' does not match the version indicated in CHANGELOG.md '$CHANGELOG_VERSION'"
    echo "Please correct the 2 versions so that the last version of the CHANGELOG matches the version of package.json"
    exit 1
fi

# Check if the new version present in package.json matches the one from the CHANGELOG and is not equal to currently published version in npm registry
if [[ $CURRENT_VERSION_NPM == $LAST_TAG_PUBLISHED_NPM ]]; then
    echo "The version indicated in package.json and CHANGELOG.md '$CURRENT_VERSION_NPM' is already published"
    echo "Please upgrade the version in package.json and CHANGELOG.md to create a new version"
    exit 1
fi

echo "The new version '$CURRENT_VERSION_NPM' is valid and can be published"