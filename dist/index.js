(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React);
    global.createReactElements = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _react) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = createReactElements;
  _react = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function createReactElements(elements) {
    var reactElements = Array.from(elements).reduce(createElement, []); //If there is only one Child, react expect children object instead of Array

    if (reactElements.length === 1) {
      return reactElements[0];
    }

    return reactElements;
  }

  function createElement(elements, element, index) {
    if (element instanceof HTMLElement) {
      var reactElement = createHTMLElement(element, index);
      elements.push(reactElement);
    } else if (element.nodeName === '#text') {
      var _reactElement = createTextElement(element); //replace new line characters with empty space


      var textContent = _reactElement.replace(/↵/, ''); //Add only if element contains text content


      if (textContent) {
        elements.push(_reactElement);
      }
    }

    return elements;
  }

  function createHTMLElement(element, index) {
    var tagName = element.tagName,
        childNodes = element.childNodes;
    var tagname = tagName.toLowerCase();
    var attributes = getAttributesMap(element);
    attributes.key = index;
    attributes.className = attributes["class"];
    delete attributes["class"];

    if (childNodes.length > 0) {
      attributes.children = createReactElements(childNodes);
    }

    return _react["default"].createElement(tagname, attributes);
  }

  function createTextElement(element) {
    return element.data.trim();
  }

  function getAttributesMap(element) {
    var attributes = element.attributes;
    var attrArray = Array.from(attributes || []);
    return attrArray.reduce(function (map, attr) {
      map[attr.name] = attr.value;
      return map;
    }, {});
  }
});
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

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
        this.$children = transclude();
        this.elementScope = scope;
        this.render();
        this.$compile(element.contents())(scope.$parent); //re render on scope changes

        this.elementScope.$watch(this.render.bind(this));
      }
    }, {
      key: "render",
      value: function render() {
        var props = this.getProps();
        var children = (0, _createReactElements["default"])(this.$children);
        (0, _reactDom.render)( /*#__PURE__*/_react["default"].createElement(this.ReactComponent, props, children), this.$container);
      }
    }]);

    return ReactDirective;
  }();

  _exports["default"] = ReactDirective;
});
