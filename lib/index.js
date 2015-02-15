var _ = require('lodash');
var ProxiesPage = require('./proxies-page');
var PageNumsParser = require('./page-num-parser');

module.exports = {
	proxies_page: function(options){
		return new ProxiesPage(options);
	},
	proxies_pages_num: function(options){
		var options = options || {};

		options = _.extend({
			parser : new PageNumsParser()
		}, options);
		
		return new ProxiesPage(options);
	}
};