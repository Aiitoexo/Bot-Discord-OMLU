#!/bin/sh

if ! command -v pm2 &> /dev/null
then
    echo "pm2 could not be found, installation in progress"
    npm install pm2 -g
fi


if command -v pm2 &> /dev/null
then
    echo "cleanup of all pm2 application"
    pm2 kill
fi

echo "starting bot-omlu application with pm2"

pm2 start index.js --watch --ignore-watch="node_modules" --name="bot-omlu"