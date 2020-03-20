"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createReactElements;

function createReactElements(elements) {
  var rElements = Array.from(elements).reduce(function (elements, element, index) {
    if (element instanceof HTMLElement) {
      var attributes = Array.from(element.attributes || []).reduce(function (attrs, attr) {
        attrs[attr.name] = attr.value;
        return attrs;
      }, {});
      attributes.key = index;
      attributes.className = attributes["class"];
      var tagname = element.tagName.toLowerCase();

      if (tagname !== 'input') {
        attributes.children = createElement(element.childNodes);
      }

      delete attributes["class"];
      var rElement = React.createElement(tagname, attributes); //, attributes.children);

      elements.push(rElement);
    } else if (element.nodeName === '#text') {
      var _rElement = element.data.trim();

      var replaceNewLine = _rElement.replace(/↵/, '');

      if (replaceNewLine) {
        elements.push(_rElement);
      }
    }

    return elements;
  }, []);

  if (rElements.length === 1) {
    return rElements[0];
  }

  return rElements;
}