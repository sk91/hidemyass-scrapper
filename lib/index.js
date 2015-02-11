var _ = require('lodash');
var Proxies = require('./proxies');
var PageNumsParser = require('./page-num-parser');

module.exports = {
	proxies: function(options){
		return new Proxies(options);
	},
	proxies_pages: function(options){
		var options = options || {};

		options = _.extend({
			parser : new PageNumsParser()
		}, options);
		
		return new Proxies(options);
	}
};