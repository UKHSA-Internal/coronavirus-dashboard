#!/bin/sh

node -e 'console.log(`*** NODE HEAP LIMIT = ${require("v8").getHeapStatistics().heap_size_limit / (1024 * 1024)} Mb`)'
