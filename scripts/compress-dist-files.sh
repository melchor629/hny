#!/bin/bash

has_gzip=$(which gzip 2> /dev/null)
has_brotli=$(which brotli 2> /dev/null)

function get_mime_type() {
  local ret=$(file "$1" --mime-type)
  local filename_len=$(echo "$1" | wc -c)
  filename_len=$(( $filename_len + 1 ))
  echo ${ret:${filename_len}}
}

function get_file_size() {
  if [ "$(uname)" = "Darwin" ]; then
    eval $(stat -s "$1")
    echo $st_size
  else
    stat -c %s "$1" || return $?
  fi
}

function can_be_compressed() {
  case "$1" in
    application/xml ) return 0 ;;
    application/json ) return 0 ;;
    application/*javascript ) return 0 ;;
    audio/*wav* ) return 0 ;;
    image/svg* ) return 0 ;;
    text/* ) return 0 ;;
    ** )
      return 1 ;;
  esac
}

function compress() {
  if [ ! -z "${has_gzip}" ]; then
    echo "Compressing $1 using gzip"
    gzip -k9 "$1" || return $?
  fi
  #if [ ! -z "${has_brotli}" ]; then
  #  echo "Compressing $1 using brotli"
  #  brotli -kZ "$1" || return $?
  #fi
}

for file in `find dist -type f`; do
  mime_type=$(get_mime_type "${file}")
  if can_be_compressed "${mime_type}"; then
    file_size=$(get_file_size "${file}")
    if [ ${file_size} -ge 1000 ]; then
      compress "${file}"
    fi
  fi
done
