#!/bin/sh

CURRENT_FOLDER=$(basename "$PWD")

if [ "$CURRENT_FOLDER" = "ci" ]; then
    cd ..
fi

# Sources utils folder
. ./ci/utils/utils.sh

npm install

if [ "$1" = "tunnel" ]; then
    npx expo start --tunnel
elif [ "$1" = "normal" ]; then
    npx expo start
else
    echo "Error: Incorrect usage\nUsage: ./ci/start.sh {tunnel|normal}"
fi
