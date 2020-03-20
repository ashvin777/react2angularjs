import React from 'react';

export default function createReactElements(elements) {
  let rElements = Array.from(elements).reduce((elements, element, index) => {

    if (element instanceof HTMLElement) {
      let attributes = Array.from(element.attributes || []).reduce((attrs, attr) => {
        attrs[attr.name] = attr.value;
        return attrs;
      }, {});

      attributes.key = index;
      attributes.className = attributes.class;

      let tagname = element.tagName.toLowerCase();
      if (tagname !== 'input') {
        attributes.children = createReactElements(element.childNodes);
      }
      delete attributes.class;

      let rElement = React.createElement(tagname, attributes);//, attributes.children);
      elements.push(rElement);
    } else if (element.nodeName === '#text') {
      let rElement = element.data.trim();
      let replaceNewLine = rElement.replace(/↵/, '');

      if (replaceNewLine) {
        elements.push(rElement);
      }
    }

    return elements;
  }, []);

  if (rElements.length === 1) {
    return rElements[0];
  }

  return rElements;
}