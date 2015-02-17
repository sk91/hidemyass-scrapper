var PageNumParser = require('../../lib/pages-count-parser');

describe("Number of proxie pages parser", function(){
	var fixture1 = read_and_load_html('pagination-sample-1.html');
	var fixture2 = read_and_load_html('pagination-sample-2.html');
	var parser;

	beforeEach(function(){
		parser = new PageNumParser();
	});


	it("should parse number of pages", function(){
		expect(parser.parse(fixture1)).toEqual(27);
		expect(parser.parse(fixture2)).toEqual(14);
	});
});