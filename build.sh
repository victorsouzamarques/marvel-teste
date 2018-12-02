#!/bin/sh

APP_NAME=marvel-teste
docker pull teracy/angular-cli
docker run -it --rm --name create-angular-project -v "01j03u05l07i09a":/home/nodejs -w /home/nodejs teracy/angular-cli ng new marvel-teste
docker-compose build

docker-compose up