

var PageNumParser = module.exports = function(){

};

PageNumParser.prototype.parse = function($){
	var last_page = $(".hma-pagination li:not(.arrow)").last().text();
	return parseInt(last_page);
};

