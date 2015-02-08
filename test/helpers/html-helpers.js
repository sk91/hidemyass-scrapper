var fs = require('fs');
var path = require('path');
var PRESETS_PATH = path.join(__dirname, '..', 'fixtures');
var DEFAULT_ENCODING = 'utf-8';

exports.read_fixture = function(name){
	var preset_path = get_path(name);
 	return fs.readFileSync(preset_path, DEFAULT_ENCODING);
}

exports.read_js = function(name){
	var preset_path = get_path(name);
	return require(preset_path)
}


exports.read_html = exports.read_xml = exports.read_fixture;
exports.read_json = exports.read_js;


function get_path(name){
	return path.join(PRESETS_PATH, name);
}