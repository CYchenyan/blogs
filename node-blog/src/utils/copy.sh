#!/bin/sh
cd /Users/yan.chen/projects/blogs/node-blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log