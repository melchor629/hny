#!/bin/bash

set -e

if [[ $# -ne 1 ]]; then
  echo "$0 [pull|push]"
  exit 1
fi

PUBLIC_URL="https://casita.melchor9000.me"
PRIVATE_PATH="/private/lobo/chelm0r/web"

if [[ "$1" = "pull" ]]; then
  for package in packages/*; do
    if [[ -d ${package}/public ]]; then
      echo "> Cleaning \"${package}/public\" files"
      rm -rf ${package}/public/
    fi
    if [[ -d ${package}/files ]]; then
      echo "> Cleaning \"${package}/files\" files"
      rm -rf ${package}/files/
    fi
  done

  echo "> Downloading assets"
  curl -fsSL "${PUBLIC_URL}/s/hny-assets.tar.zstd" | zstd -d - | tar -xv -C .

  if [[ -d "${PRIVATE_PATH}" ]]; then
    echo
    echo "> Downloading files"
    cat "${PRIVATE_PATH}/w/hny-files.tar.zstd" | zstd -d - | tar -xv -C .
  fi

  echo "> Done!"
elif [[ "$1" = "push" ]]; then
  echo "> Uploading assets"
  tar -cv -C . packages/*/public/ | zstd > "${PRIVATE_PATH}/s/hny-assets.tar.zstd"

  echo
  echo "> Uploading files"
  tar -cv -C . packages/*/files/ | zstd > "${PRIVATE_PATH}/w/hny-files.tar.zstd"
else
  echo "Unknown '$1' command"
  exit 1
fi
