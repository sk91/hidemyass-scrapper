var _ = require('lodash');
var ProxiesPage = require('./proxies-page');
var Proxies = require('./proxies');


module.exports = {
	proxies: function(options){
		return new Proxies(options)
	},
	proxies_page: function(options){
		return new ProxiesPage(options);
	}
};