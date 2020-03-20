import createReactElements from "./create-react-elements";

export default function reactToAngularjs(ReactComponent, props = []) {

  return ['$compile', function ($compile) {
    let scope = props.reduce((scope, prop) => {
      scope[prop] = `<${prop}`;
      return scope;
    }, {});

    return {
      restrict: 'E',
      transclude: true,
      scope,
      link: function (scope, element, attrs, ctrl, transclude) {
        let $element = element[0];
        let $transcluded = transclude();

        this.render({ $transcluded, $element, $compile, scope });
        $compile(element.contents())(scope.$parent);

        scope.$watch(() => {
          this.render({ $transcluded, $element, $compile, scope });
        });
      },
      render: function ({ $transcluded, scope, $compile, $element }) {
        let componentProps = props.reduce((props, prop) => {
          props[prop] = scope[prop];
          return props;
        }, {});

        render(
          <ReactComponent {...componentProps}>
            {createReactElements($transcluded, $compile, scope)}
          </ReactComponent>,
          $element
        );
      }
    };
  }];
}