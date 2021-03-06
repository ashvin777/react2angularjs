import React from 'react';

export default function createReactElements(elements) {
  let reactElements = Array.from(elements).reduce(createElement, []);

  //If there is only one Child, react expect children object instead of Array
  if (reactElements.length === 1) {
    return reactElements[0];
  }

  if (reactElements.length === 0) {
    return undefined;
  }

  return reactElements;
}

function findReactComponent(el) {
  let key = Object.keys(el).find(key =>
    key.startsWith('__reactInternalInstance$')
  );

  if (el[key]) {
    let fiberNode = el[key];
    return fiberNode && fiberNode.return; //fiberNode.return && fiberNode.return.stateNode;
  }

  return null;
}

function createElement(elements, element, index) {
  if (element instanceof HTMLElement) {
    let existing = findReactComponent(element);

    if (!existing) {
      let reactElement = createHTMLElement(element, index);
      elements.push(reactElement);
    }
    
  } else if (element.nodeName === '#text') {
    let reactElement = createTextElement(element);
    //replace new line characters with empty space
    let textContent = reactElement.replace(/âµ/, '');

    //Add only if element contains text content
    if (textContent) {
      elements.push(reactElement);
    }
  }

  return elements;
}

function createHTMLElement(element, index) {
  let { tagName, childNodes } = element;
  let tagname = tagName.toLowerCase();
  let attributes = getAttributesMap(element);

  attributes.key = index;
  attributes.className = attributes.class;
  delete attributes.class;

  if (childNodes.length > 0) {
    attributes.children = createReactElements(childNodes);
  }

  return React.createElement(tagname, attributes);
}

function createTextElement(element) {
  return element.data.trim();
}

function getAttributesMap(element) {
  let { attributes } = element;
  let attrArray = Array.from(attributes || []);

  return attrArray.reduce((map, attr) => {
    map[attr.name] = attr.value;
    return map;
  }, {});
}
