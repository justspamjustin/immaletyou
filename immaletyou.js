/**
 _ __  __ __  __  ____      _    ____ _____    __  ______ __ __
| |  \/  |  \/  |/ () \    | |__| ===|_   _|   \ \/ / () |  |  |
|_|_|\/|_|_|\/|_/__/\__\   |____|____| |_|      |__|\____/\___/

**/

var returned, mocks;

var ImmaLetYou = function(opts) {
	this.baseUrl = opts.baseUrl || '';
	this.defaultMock = opts.defaultMock || {};
};

ImmaLetYou.prototype.finish = function(path) {
	mocks = {};
	this.path = path;
	return this;
};

ImmaLetYou.prototype.ofAllTime = function() {
	var path = this.baseUrl + this.path;
	require(path);
	var name = require.resolve(path);
	delete require.cache[name];
	return returned;
};

ImmaLetYou.prototype.but = function(path, mock) {
	mocks[path] = mock;
	return this;
};

var define = function(callback) {
	var mockRequire = function(path) {
		return mocks[path] || sinon.stub();
	};
	returned = callback(mockRequire);
};

global.define = define;
module.exports = ImmaLetYou;