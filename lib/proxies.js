var _ = require('lodash');
var async = require('async');
var config = require('./config');
var ProxiesPage = require('./proxies-page');

var Proxies = module.exports = function(options){
	options = options || {};
	url = options.url || config.proxies_url;


	this.options = _.extend({
		url : url,
		start:1,
		parallel:1
	}, options);

};

Proxies.prototype.get = function(options, cb){
	if(typeof options == "function"){
		cb = options;
		options = {};
	}
	options = options || {};
	options = _.extend({}, this.options, options )
	ProxiesPage.createPageCountScrapper()
		.get({url: options.url}, counted_pages.bind(this));

	function counted_pages (err, pages) {
		var end = pages;
		if(options.end){
			end = Math.min(end, options.end);
		}
		if(options.limit){
			end = Math.min(end, options.start + options.limit);
		}
		options.end = end;
		this._get_pages(options, cb);
	}

}	

Proxies.prototype._get_pages = function  (options , cb) {
	var queue = async.queue(get_page, options.parallel);
	var proxies = [];
	var errors = [];

	for(var i = options.start; i <= options.end; i++){
		queue.push(i, finished_processing_page)
	};
	queue.drain = finished_all;
	

	function get_page (page, cb) {
		new ProxiesPage().get({
			url:options.url,
			page: page
		}, got_page);
		
		function got_page (err, page_proxies) {
			if(err){
				return cb(err);
			}
			proxies = proxies.concat(page_proxies);
			cb();
		}
	}

	

	function finished_processing_page (err) {}

	function finished_all () {
		cb(null, proxies);
	}
}