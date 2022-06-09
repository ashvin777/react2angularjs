(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "react-dom", "./create-react-elements"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("react-dom"), require("./create-react-elements"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.ReactDOM, global.createReactElements);
    global.reactDirective = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _react, _reactDom, _createReactElements) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _react = _interopRequireDefault(_react);
  _createReactElements = _interopRequireDefault(_createReactElements);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  var ReactDirective = /*#__PURE__*/function () {
    function ReactDirective(ReactComponent, propNames, $compile) {
      _classCallCheck(this, ReactDirective);

      this.restrict = 'EA';
      this.transclude = true;
      this.ReactComponent = ReactComponent;
      this.propNames = propNames;
      this.$compile = $compile;
      this.scope = this.getScopeBindings();
    }

    _createClass(ReactDirective, [{
      key: "getScopeBindings",
      value: function getScopeBindings() {
        return this.propNames.reduce(function (scope, propName) {
          scope[propName] = "<".concat(propName);
          return scope;
        }, {});
      }
    }, {
      key: "getProps",
      value: function getProps() {
        var _this = this;

        return this.propNames.reduce(function (props, propName) {
          props[propName] = _this.elementScope[propName];
          return props;
        }, {});
      }
    }, {
      key: "link",
      value: function link(scope, element, attrs, ctrl, transclude) {
        this.$container = element[0];
        this.$children = transclude(function () {});
        this.elementScope = scope;
        this.render();
        this.$compile(element.contents())(scope.$parent); //re render on scope changes

        this.elementScope.$watchGroup(Object.keys(this.elementScope.$$isolateBindings), this.render.bind(this));
      }
    }, {
      key: "render",
      value: function render() {
        var props = this.getProps();

        if (!this.memoized) {
          var children = (0, _createReactElements["default"])(this.$children);
          this.memoized = children;
        }

        (0, _reactDom.render)( /*#__PURE__*/_react["default"].createElement(this.ReactComponent, props, this.memoized), this.$container);
      }
    }]);

    return ReactDirective;
  }();

  _exports["default"] = ReactDirective;
});