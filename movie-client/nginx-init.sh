#!/bin/sh
echo ----
echo Starting Nginx init.sh

echo
echo ----
echo Environment variables from docker used in this script:
echo MOVIE_CATALOG_SERVICE_URI: $MOVIE_CATALOG_SERVICE_URI
echo MOVIE_INFO_SERVICE_URI: $MOVIE_INFO_SERVICE_URI
echo RATINGS_DATA_SERVICE_URI: $MOVIE_INFO_SERVICE_URI
echo JAEGER_AGENT_URI: $JAEGER_AGENT_URI

envsubst '$MOVIE_CATALOG_SERVICE_URI $MOVIE_INFO_SERVICE_URI $RATINGS_DATA_SERVICE_URI' < /home/nginx/nginx.conf > /etc/nginx/nginx.conf

envsubst '$JAEGER_AGENT_URI' < /home/nginx/nginx-jaeger-config.json > /etc/nginx-jaeger-config.json

echo Configuration file loaded:
echo
cat /etc/nginx/nginx.conf
echo
echo "(EOF)"

echo
echo ----
echo Starting Nginx
nginx -s reload
nginx -g 'daemon off;'