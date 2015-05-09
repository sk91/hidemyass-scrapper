#Hidemyass Scrapper

This library should provide an api for www.hidemyass.com proxy list.

##Setup

```
npm install git+https://bitbucket.org/sk91/hidemyass.git
```

##Usage
###List Proxies
####All
```
var hidemyass = require('hidemyass');

hidemyass
    .proxies()
    .get(got_proxies)

function got_proxies(err, proxies){
    if(err){
        return console.error(err);
    }
    console.log(proxies);
}
```
####Range
```
var hidemyass = require('hidemyass');

hidemyass
    .proxies()
    .get({start:5, end:8}, got_proxies)

function got_proxies(err, proxies){
    if(err){
        return console.error(err);
    }
    console.log(proxies);
}
```
###Get Proxies from specific page
```
var hidemyass = require('hidemyass');

hidemyass
    .proxies_page()
    .get({page: 3},got_proxies);

function got_proxies(err, proxies){
    if(err){
        return console.error(err);
    }
    console.log(proxies);
}
```
###Count number of active proxy pages
```
var hidemyass = require('hidemyass');

hidemyass
    .proxies_page()
    .countPages(got_pages);

function got_pages(err, pages){
    if(err){
        return console.error(err);
    }
    console.log(pages);
}
```

##Output example:
```
[ { updated: 1424204283,
    ip: '180.183.206.107',
    port: 3128,
    country: { name: 'Thailand', slag: 'th' },
    speed: 6802,
    connection_time: 385,
    protocol: 'http',
    anonymity: 'high',
    keep_alive: false },
  { updated: 1424204163,
    ip: '89.135.122.165',
    port: 3128,
    country: { name: 'Hungary', slag: 'hu' },
    speed: 5184,
    connection_time: 28,
    protocol: 'https',
    anonymity: 'high',
    keep_alive: true },
  { updated: 1424204042,
    ip: '190.204.255.15',
    port: 8080,
    country: { name: 'Venezuela', slag: 've' },
    speed: 7155,
    connection_time: 350,
    protocol: 'https',
    anonymity: 'high',
    keep_alive: true } ]
```

##Development
###Tests
To run test use the following command:
```
npm test
```

###Contributions
Contributions can be submitted to https://bitbucket.org/sk91/hidemyass
Pull request should be mergeable and unit tested.



