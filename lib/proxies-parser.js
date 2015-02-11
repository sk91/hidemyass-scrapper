

var ProxiesParser = module.exports = function(){
};

ProxiesParser.prototype.parse = function($){
	var proxies = [];
	$("tbody tr").each(function(index,element){
		proxies.push(this.parseProxy($(element), $));
	}.bind(this));
	return proxies;
};

ProxiesParser.prototype.parseProxy = function($proxy, $){
	var $tds = $("td", $proxy).map(function(index,element){
		return $(element);
	});
	return {
		'updated' : this.parseLastUpdated($tds[0],$),
		'ip': this.parseIp($tds[1],$),
		'port': this.parsePort($tds[2],$),
		'country': this.parseCountry($tds[3], $),
		'speed':this.parseSpeed($tds[4],$),
		'connection_time': this.parseConnectionTime($tds[5],$),
		'protocol': this.parseProtocol($tds[6], $),
		'anonymity': this.parseAnonymityLevel($tds[7], $),
		'keep_alive': this.parseKeepAlive($tds[7], $)
	}
};

ProxiesParser.prototype.parseIp = function($ip , $){
	var $style = $('style', $ip);
	var fake_classnames = this.parseFakeClassNames($style, $);
	var ip = [];
	var $spans = $("span>span", $ip);

	fake_classnames.forEach(clean_fake_classname);

	$spans.each(pick_visible);

	return ip.join(".");

	function clean_fake_classname(classname){
		$spans = $spans.not('.' + classname);
	}

	function pick_visible(index, span){
		var text;
		var $span = $(span);
		var style = $span.attr('style');

		if(/display:none/.test(style)){
			return;
		}
		text = $span.text().trim();

		if(!(!isNaN(parseFloat(text)) && isFinite(text))){
			return;
		}
		ip.push(text);
	}
};

ProxiesParser.prototype.parsePort = function($port, $){
	return parseInt($port.text().trim());
};

ProxiesParser.prototype.parseCountry = function($country, $){
	var name = $('.country', $country).text().trim();
	var slag = $country.attr('rel');
	return {
		name: name,
		slag: slag
	}
};

ProxiesParser.prototype.parseSpeed = function($speed, $){
	var text = $('.progress-indicator', $speed).attr('rel');
	return parseInt(text);
};

ProxiesParser.prototype.parseConnectionTime = function($ctime, $){
	var text = $('.progress-indicator', $ctime).attr('rel');
	return parseInt(text);
};

ProxiesParser.prototype.parseLastUpdated = function($updated, $){
	var text = $updated.attr('rel');
	return parseInt(text);
};

ProxiesParser.prototype.parseProtocol = function($protocol, $){
	return $protocol.text().trim().toLowerCase();
};

ProxiesParser.prototype.parseAnonymityLevel = function($anonymity, $){
	return $anonymity.text().replace(" +KA","").trim().toLowerCase();
};

ProxiesParser.prototype.parseKeepAlive = function($kalive, $){
	return /^.*\+KA$/.test($kalive.text());
};

ProxiesParser.prototype.parseFakeClassNames = function($style, $){
	var text = $style.text();
	classnames = [];
	text.replace(/\.(.*?)\{display\:none\}/g, function (match, classname) {
		classnames.push(classname);
	});

	return classnames;
};