

var ProxiesParser = module.exports = function(){

};

ProxiesParser.prototype.parse = function($){

};







HideMyAssScrapper.prototype.scrap = function(start, end, callback){
	if(typeof start === 'function'){
		callback = start;
		start = 1;
	}
	if(typeof end === 'function'){
		callback = end;
		end = false;
	}
	var page = start || 1;
	var queue = async.queue(this.scrapPage.bind(this),1);
	var proxies = [];
	queue.drain = all_pages_scraped;
	queue.push(1, page_scrapped);

	function page_scrapped (err, page_proxies) {
		if(err){
			return callback(err);
		}

		proxies = proxies.concat(page_proxies);
		if((end && ++page >=end) || err || !page_proxies.length){
			return  console.log("end, stopping");
		}

		queue.push(page, page_scrapped);
	}

	function all_pages_scraped(){
		callback(null, proxies);
	}
};

HideMyAssScrapper.prototype.scrapPage = function(page, callback){
	page = ((page == 1)? '' : page);

	request([BASE_URL, page].join('/'), page_rescived);

	function page_rescived (err, res, body) {
		if(!res || res.statusCode !== 200){
			return callback("Response code was not 200");
		}

		var types = parse_types(body);
		var ports = parse_ports(body);
		var ips = parse_ips(body);
		var proxies = [];

		if(ports.length != ips.length || ips.length != types.length){
			return callback("Regex parsing has failed");
		}

		for(var i = 0; i < ips.length; i++){
			if(types[i] == 'HTTP'){
				proxies.push([ips[i], ports[i]].join(':'));
			}
		}
		
		return callback(null, proxies);
	}


	function parse_fake_classnames(body){
		classnames = {};
		body.replace(/\.(.*?)\{display\:none\}/g, function () {
		    //arguments[0] is the entire match
		    classnames[arguments[1]] = 1
		})
		return classnames;
	}

	function parse_types (body) {
		var types = [];
		body.replace(/<td>(.*?)<\/td>/g, function () {
			if(arguments[1] == "HTTP" || arguments[1] == "HTTPS" || arguments[1] == "socks4/5")
				types.push(arguments[1])
		})
		return types;
	}

	function parse_ports(body){
		var ports = []
		body = body.replace(/\s/g,'')

		body.replace(/<td>([0-9]+)<\/td>/g, function () {
			ports.push(arguments[1])
		})
		return ports;
	}

	function parse_ips(body){
		var ips = [];
		var fake_classnames = parse_fake_classnames(body);
		body.replace(/<\/style>(.*?)<\/td>/g, function () {
		    var temp = arguments[1]
		    temp = temp.replace(/<span class\=\"(.*?)\">.*?<\/span>/g,function(){
		    	if(fake_classnames[arguments[1]]){
		    		return ''
		    	}
		    	return arguments[0]
		    })
		    temp = temp.replace(/<span style\=\"display\:none\">(.*?)<\/span>/g,"")
		    temp = temp.replace(/<div style\=\"display\:none\">(.*?)<\/div>/g,"")
		    temp = temp.replace(/<(.*?)>/g,'')
		    ips.push(temp)
		});
		return ips;
	}


};


exports.scrap = function(start, end, cb){
	new HideMyAssScrapper().scrap(start, end, cb);
};


