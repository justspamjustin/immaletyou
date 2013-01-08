/**
 _ __  __ __  __  ____      _    ____ _____    __  ______ __ __
 | |  \/  |  \/  |/ () \    | |__| ===|_   _|   \ \/ / () |  |  |
 |_|_|\/|_|_|\/|_/__/\__\   |____|____| |_|      |__|\____/\___/

 **/

var obj = (function() {
  var mocks, modules = {};

  ImmaLetYou = function(opts) {
    this.basePath = opts.basePath || '';
    this.defaultMock = opts.defaultMock || {};
  };

  ImmaLetYou.prototype.finish = function(path) {
    mocks = {};
    this.path = path;
    return this;
  };

  ImmaLetYou.prototype.ofAllTime = function() {
    var path = this.basePath + this.path;
    var self = this;
    var mockRequire = function(path) {
      return mocks[path] || self.defaultMock;
    };
    var moduleReturn;
    try {
      moduleReturn = modules[path](mockRequire);
    } catch(e) {
      var paths = '';
      for(var i  in modules) {
        paths += i + '\n';
      }

      throw Error('Could not find module with path ' + path + '\nRegistered paths are:\n' + paths);
    }

    return moduleReturn;
  };

  ImmaLetYou.prototype.but = function(path, mock) {
    mocks[path] = mock;
    return this;
  };

  define = function(callback) {
    var scripts = document.getElementsByTagName('script');
    var last = scripts[scripts.length - 1];
    var fullPath = last.src;
    var requirePath = fullPath.replace(/http:\/\/.*\/base\//g,'');
    requirePath = requirePath.replace(/\.js\?.*/g,'');
    modules[requirePath] = callback;
  };
  return {
    ImmaLetYou: ImmaLetYou,
    define: define
  };
})();

var ImmaLetYou = obj.ImmaLetYou,define = obj.define;