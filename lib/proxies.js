
var util = require('util');
var _ = require('lodash');

var PageScrapper = require('scrappers').PageScrapper;
var ProxiesParser = require('./proxies-parser');
var config = require('./config');

var request = require('request')
var async = require('async');



var Proxies = module.exports = function(options){
	options = options || {};

	options = _.extend({
		url : config.proxies_url,
		parser : new ProxiesParser()
	}, options);

	PageScrapper.call(this, options);
}

util.inherits(Proxies, PageScrapper);
