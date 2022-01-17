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

  getProps() {
    return this.propNames.reduce((props, propName) => {
      props[propName] = this.elementScope[propName];
      return props;
    }, {});
  }

  link(scope, element, attrs, ctrl, transclude) {
    this.$container = element[0];
    this.$children = transclude();
    this.elementScope = scope;

    this.render();
    this.$compile(element.contents())(scope.$parent);

    //re render on scope changes
    this.elementScope.$watchGroup(Object.keys(this.elementScope.$$isolateBindings), this.render.bind(this));
  }

  render() {
    let props = this.getProps();

    if (!this.memoized) {
      let children = createReactElements(this.$children);
      this.memoized = children;
    }

    render(
      <this.ReactComponent {...props}>{this.memoized}</this.ReactComponent>,
      this.$container
    );
  }
}
