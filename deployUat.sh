#!/bin/bash
npm run build:uat
scp -r ./build/* www@192.168.103.107:~/h5/antifake
