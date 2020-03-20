(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./react-directive"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./react-directive"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reactDirective);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _reactDirective) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = reactToAngularjs;
  _reactDirective = _interopRequireDefault(_reactDirective);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function reactToAngularjs(ReactComponent) {
    var propNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return ['$compile', function ($compile) {
      return new _reactDirective["default"](ReactComponent, propNames, $compile);
    }];
  }
});