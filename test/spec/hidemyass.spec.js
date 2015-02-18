var hidemyass = require('../../index');
var Mitm = require('mitm');

describe("hide my ass", function(){
	var mitm, stub;
	beforeEach(function(){
		mitm = Mitm();
		stub = {
			response: read_html('page-sample-1.html'),
			status: 200,
			requestTest: function(){}
		};
		mitm.on('request', function(req,res){
			stub.requestTest(req,res);
			res.statusCode = stub.status;
			res.end(stub.response);
		});
	});
	it("should parse page", function(done){
		hidemyass.proxies_page().get(function(err, proxies){
			expect(proxies).toBeTruthy();
			expect(proxies.length).toBe(50);
			done();
		});
	});

	it("should parse page count", function(done){
		hidemyass.proxies_page().countPages(function(err, num){
			expect(num).toBe(27);
			done();
		});
	});


	it("should go correctly to page 1", function(done){
		stub.requestTest = function(req){
			expect(req.url).toBe('/');
			done();
		}
		hidemyass.proxies_page().get({page: 1, url: 'http://localhost/'}, function(){});
	});

	it("should go correctly to page 2", function(done){
		stub.requestTest = function(req){
			expect(req.url).toBe('/2');
			done();
		}
		hidemyass.proxies_page().get({page: 2, url: 'http://localhost/'}, function(){});
	});


	it("should go correctly to page 18", function(done){
		stub.requestTest = function(req){
			expect(req.url).toBe('/18');
			done();
		}
		hidemyass.proxies_page().get({page: 18, url: 'http://localhost/'}, function(){});
	});

	it("should parse all pages", function(done){
		stub.response = read_html('simple_proxies_mock.html');
		hidemyass.proxies().get({ url: 'http://localhost/'}, function(err, proxies){
			expect(proxies.length).toBe(27);
			done();
		});
	});
});