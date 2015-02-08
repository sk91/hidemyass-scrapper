var Proxies = require('./proxies');


module.exports = {
	proxies: function(options){
		return new Proxies(options);
	},
	proxies_pages: function(options){
		return new Proxies(options);
	}
};