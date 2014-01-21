/**
 _ __  __ __  __  ____      _    ____ _____    __  ______ __ __
 | |  \/  |  \/  |/ () \    | |__| ===|_   _|   \ \/ / () |  |  |
 |_|_|\/|_|_|\/|_/__/\__\   |____|____| |_|      |__|\____/\___/

 **/

var obj = (function() {
  var mocks, modules = {}, testsBasePathRegex = '', testsExtensionReplaceRegex = '\.js\?.*';

  ImmaLetYou = function(opts) {
    this.basePath = opts.basePath || '';
    this.defaultMock = opts.defaultMock || {};
    testsBasePathRegex = opts.testsBasePathRegex || testsBasePathRegex;
    testsExtensionReplaceRegex = opts.testsExtensionReplaceRegex || testsExtensionReplaceRegex;
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
    var theModule = modules[path];
    if(theModule) {
      moduleReturn = theModule(mockRequire);
    } else {
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
    var requirePath = fullPath.replace(new RegExp('http:\/\/.*\/' + testsBasePathRegex,'g'),'');
    requirePath = requirePath.replace(new RegExp(testsExtensionReplaceRegex, 'g'),'');
    modules[requirePath] = callback;
  };
  return {
    ImmaLetYou: ImmaLetYou,
    define: define
  };
})();

var ImmaLetYou = obj.ImmaLetYou,define = obj.define;
