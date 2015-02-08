var cheerio = require('cheerio');
var PageNumParser = require('../../lib/page-num-parser');

describe("Number of proxie pages parser", function(){
	var fixture1 = read_html('pagination-sample-1.html');
	var fixture2 = read_html('pagination-sample-2.html');
	var parser;

	beforeEach(function(){
		parser = new PageNumParser();
	});


	it("should parse number of pages", function(){
		var $;
		
		$ = cheerio.load(fixture1);
		expect(parser.parse($)).toEqual(27);

		$ = cheerio.load(fixture2);
		expect(parser.parse($)).toEqual(14);
	});


});