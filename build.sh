#!/bin/bash

cd 2019
yarn build
cd ..

docker image build -t hny-melchor9000 -f simple.dockerfile .

# docker image save hny-melchor9000 | ssh majorcadevs docker image load
