#!/bin/bash

IMAGE_NAME="hny-melchor9000"
IMAGE_PULL=$([ ! -z "$1" ] && printf "%s" "--pull" || printf "")

function webpack_build() {
    # $1 is the path to build
    echo " > Building '$1'"
    cd "$1"
    if which yarn > /dev/null; then
        [ ! -d node_modules ] && yarn
        yarn build || return $?
    elif which npm > /dev/null; then
        [ ! -d node_modules ] && npm install
        npm run build || return $?
    else
        [ ! -z "$IMAGE_PULL" ] && docker image pull node
        [ ! -d node_modules ] && docker container run --rm -it -v $PWD:/app node bash -c "cd app && yarn"
        docker container run --rm -it -v $PWD:/app node bash -c "cd app && yarn build" || return $?
    fi
    cd ..
    echo
}

webpack_build 2019 || exit $?

echo " > Building $IMAGE_NAME image"
docker image build $IMAGE_PULL -t $IMAGE_NAME -f simple.dockerfile . || exit $?

# docker image save hny-melchor9000 | ssh majorcadevs docker image load
