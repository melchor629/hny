#!/bin/bash

rm -rf dist

for package_path in packages/*; do
  package=$(echo $package_path | cut -d/ -f2)
  dist_path="dist/${package}"

  if [ "${package}" = "home" ]; then
    dist_path="dist/"
  fi

  if [ -d "${package_path}/dist" ]; then
    echo "> package ${package} -> ${dist_path}"
    mkdir -p "${dist_path}"
    cp -r "${package_path}/dist"/* "${dist_path}"
  fi
done
