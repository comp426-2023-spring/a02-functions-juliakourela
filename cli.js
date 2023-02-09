#!/usr/bin/env node

import minimist from 'minimist';
import moment from 'moment-timezone';
import node_fetch from 'node-fetch';

let arg = minimist(process.argv.slice(2))

if (arg.h) {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE`)
    console.log(`    -h            Show this help message and exit.`)
    console.log(`    -n, -s        Latitude: N positive; S negative.`)
    console.log(`    -e, -w        Longitude: E positive; W negative.`)
    console.log(`    -z            Time zone: uses tz.guess() from moment-timezone by default.`)
    console.log(`    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.`)
    console.log(`    -j            Echo pretty JSON from open-meteo API and exit.`)
    process.exit(0)
}

const timezone = moment.tz.guess();
if (arg.z) timezone = arg.z;

var latitude = 0;
if (arg.s && !(arg.n)) latitude = parseFloat(arg.s) * -1;
else latitude = parseFloat(arg.n);

var longitude = 0;
if (arg.w && !(arg.e)) longitude = parseFloat(arg.w) * -1;
else longitude = parseFloat(arg.e);

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&timezone' + timezone + '&daily=precipitation_hours');
const data = await response.json();

if (arg.j) {
    console.log(data);
    process.exit(0);
}