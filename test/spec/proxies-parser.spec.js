var ProxyParser = require('../../lib/proxies-parser');

describe("proxies page parser", function(){
	var parser;

	beforeEach(function(){
		parser = new ProxyParser();
	});

	it("should parse proxy page", function(){
		var fixture = read_and_load_html("page-sample-1.html");
		parsed = parser.parse(fixture);
		expect(parsed.length).toBe(50);
	});

	it("should parse proxy", function(){
		var fixture = read_and_load_html('proxy-sample-1.html');
		var expected = read_json('proxy-sample-1-parsed.json');
		parsed = parser.parseProxy(fixture('tr'), fixture);
		expect(parsed).toEqual(expected);

		fixture = read_and_load_html('proxy-sample-2.html');
		expected = read_json('proxy-sample-2-parsed.json');
		parsed = parser.parseProxy(fixture('tr'), fixture);
		expect(parsed).toEqual(expected);
	});

	it("should parse last update time", function(){
		var fixture = read_and_load_html('updated-sample.html');
		expect(parser.parseLastUpdated(fixture('td'), fixture))
			.toEqual(1423404784);
	});

	it("should parse ip", function(){
		var fixture = read_and_load_html('ip-sample-1.html');
		expect(parser.parseIp(fixture('td'), fixture))
			.toEqual("183.221.217.163");

		fixture = read_and_load_html('ip-sample-2.html');
		expect(parser.parseIp(fixture('td'), fixture))
			.toEqual("49.1.245.240");
	});

	it("should parse fake classnames", function(){
		var fixture = read_and_load_html('fake-classnames-sample.html');
		expect(parser.parseFakeClassNames(fixture('style'), fixture))
			.toEqual(["VVbC", "dx5G", "mIL8"]);
	});

	it("should parse port", function(){
		var fixture = read_and_load_html('port-sample.html');
		expect(parser.parsePort(fixture('td'), fixture))
			.toBe(8123);
	});

	it("should parse country", function(){
		var fixture = read_and_load_html('country-sample.html');
		expect(parser.parseCountry(fixture('td'), fixture))
			.toEqual({
				slag: "cn",
				name: "China"
			});
	});

	it("should parse speed", function(){
		var fixture = read_and_load_html('speed-sample.html');
		expect(parser.parseSpeed(fixture('td'), fixture))
			.toBe(6428);
	});

	it("should parse connection time", function(){
		var fixture = read_and_load_html('connection-time-sample.html');
		expect(parser.parseConnectionTime(fixture('td'), fixture))
			.toBe(299);
	});

	it("should parse protocol", function(){
		var fixture = read_and_load_html('protocol-sample.html');
		expect(parser.parseProtocol(fixture('td'), fixture))
			.toEqual("https");
	});

	it("should parse anonimity level", function(){
		var fixture = read_and_load_html('anonymity-level-sample.html');
		expect(parser.parseAnonymityLevel(fixture('td'), fixture))
			.toEqual("high");
	});

	it("should parse keep-alive", function(){
		var fixture = read_and_load_html('anonymity-level-sample.html');
		expect(parser.parseKeepAlive(fixture('td'), fixture))
			.toBe(true);
	});

});
