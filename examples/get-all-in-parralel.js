var hidemyass = require('../index');

console.log("Getting proxies");

hidemyass
  .proxies({
    parallel: 10,
    limit:2 //limit to 2 pages
  })
  .get(got_proxies);



function got_proxies(err, proxies) {
  if (err) {
    return console.error(err);
  }
  var proxy_ips = proxies.map(build_proxy_url);

  console.log("Proxies found:", proxy_ips.length);
  console.log("Full list:", proxy_ips);
}


function build_proxy_url(proxy){
    return proxy.protocol + "://" +proxy.ip + ":" + proxy.port;
}
