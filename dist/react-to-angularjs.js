"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reactToAngularjs;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _createReactElements = _interopRequireDefault(require("./create-react-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function reactToAngularjs(ReactComponent) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return ['$compile', function ($compile) {
    var scope = props.reduce(function (scope, prop) {
      scope[prop] = "<".concat(prop);
      return scope;
    }, {});
    return {
      restrict: 'E',
      transclude: true,
      scope: scope,
      link: function link(scope, element, attrs, ctrl, transclude) {
        var _this = this;

        var $element = element[0];
        var $transcluded = transclude();
        this.render({
          $transcluded: $transcluded,
          $element: $element,
          $compile: $compile,
          scope: scope
        });
        $compile(element.contents())(scope.$parent);
        scope.$watch(function () {
          _this.render({
            $transcluded: $transcluded,
            $element: $element,
            $compile: $compile,
            scope: scope
          });
        });
      },
      render: function render(_ref) {
        var $transcluded = _ref.$transcluded,
            scope = _ref.scope,
            $compile = _ref.$compile,
            $element = _ref.$element;
        var componentProps = props.reduce(function (props, prop) {
          props[prop] = scope[prop];
          return props;
        }, {});
        (0, _reactDom.render)(_react["default"].createElement(ReactComponent, componentProps, (0, _createReactElements["default"])($transcluded, $compile, scope)), $element);
      }
    };
  }];
}