var hidemyass = module.exports = require('./lib');
hidemyass
  .proxies({
    parallel: 10
  })
  .get(got_proxies);

function got_proxies(err, proxies) {
  if (err) {
    return console.error(err);
  }
  console.log(proxies);
}
