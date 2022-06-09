import React from 'react';
import { render } from 'react-dom';
import createReactElements from './create-react-elements';

export default class ReactDirective {
  constructor(ReactComponent, propNames, $compile) {
    this.restrict = 'EA';
    this.transclude = true;

    this.ReactComponent = ReactComponent;
    this.propNames = propNames;
    this.$compile = $compile;

    this.scope = this.getScopeBindings();
  }

  getScopeBindings() {
    return this.propNames.reduce((scope, propName) => {
      scope[propName] = `<${propName}`;
      return scope;
    }, {});
  }

  getProps(elementScope) {
    return this.propNames.reduce((props, propName) => {
      props[propName] = elementScope[propName];
      return props;
    }, {});
  }

  link(scope, element, attrs, ctrl, transclude) {
    const $container = element[0];
    const $children = transclude();
    const children = createReactElements($children);

    this.render(scope, $container, children);
    this.$compile(element.contents())(scope.$parent);

    //re render on scope changes
    scope.$watchGroup(
      Object.keys(scope.$$isolateBindings),
      this.render.bind(this, scope, $container, children)
    );
  }

  render(elementScope, $container, children) {
    let props = this.getProps(elementScope);

    render(
      <this.ReactComponent {...props}>{children}</this.ReactComponent>,
      $container
    );
  }
}
