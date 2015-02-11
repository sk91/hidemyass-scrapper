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
		hidemyass.proxies().get(function(err, proxies){
			expect(proxies).toBeTruthy();
			expect(proxies.length).toBe(50);
			done();
		});
	});

	it("should parse page count", function(done){
		hidemyass.proxies_pages().get(function(err, num){
			expect(num).toBe(27);
			done();
		});
	});


	it("should go correctly to page 1", function(done){
		stub.requestTest = function(req){
			expect(req.url).toBe('/');
			done();
		}
		hidemyass.proxies().get({page: 1, url: 'http://localhost/'}, function(){});
	});

	it("should go correctly to page 2", function(done){
		stub.requestTest = function(req){
			expect(req.url).toBe('/2');
			done();
		}
		hidemyass.proxies().get({page: 2, url: 'http://localhost/'}, function(){});
	});
});