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