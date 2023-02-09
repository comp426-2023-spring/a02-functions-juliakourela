#!/usr/bin/env node

import minimist from 'minimist';
import moment_timezone from 'moment-timezone';
import node_fetch from 'node-fetch';

if (process.argv[2] && process.argv[2] === '-h') {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE`)
    console.log(`    -h            Show this help message and exit.`)
    console.log(`    -n, -s        Latitude: N positive; S negative.`)
    console.log(`    -e, -w        Longitude: E positive; W negative.`)
    console.log(`    -z            Time zone: uses tz.guess() from moment-timezone by default.`)
    console.log(`    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.`)
    console.log(`    -j            Echo pretty JSON from open-meteo API and exit.`)
    exit(0)
}
