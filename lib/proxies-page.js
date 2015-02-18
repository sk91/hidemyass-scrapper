var PageNumsParser = require('./pages-count-parser');
var util = require('util');
var _ = require('lodash');
var url_join = require('url-join');

var PageScrapper = require('scrappers').PageScrapper;
var ProxiesParser = require('./proxies-parser');
var config = require('./config');

var request = require('request')
var async = require('async');



var Proxies = module.exports = function(options){
	options = options || {};
	url = options.url || config.proxies_url;

	url = this._updatePageUrl(options.page, url);

	options = _.extend({
		url : url,
		parser : new ProxiesParser()
	}, options);

	PageScrapper.call(this, options);
}


util.inherits(Proxies, PageScrapper);


Proxies.prototype.get = function(options, cb){
	if(typeof options == 'function'){
		cb = options;
		options = {};
	}
	options = _.extend({}, this.options, options);
	options.url = this._updatePageUrl(options.page, options.url);
	return PageScrapper.prototype.get.call(this, options, cb);
};

Proxies.prototype.countPages = function(options, cb){
	if(typeof options === 'function'){
		cb = options;
		options = {};
	}
	options = options || {};

	options = _.extend({}, this.options, {
		parser : new PageNumsParser()
	}, options);
	return this.get(options, cb);
};



Proxies.prototype._updatePageUrl = function(page, url){
	if(!page){
		return url;
	}
	if(page == 1){
		page = '';
	}

	return url_join((url || ''), page);
};