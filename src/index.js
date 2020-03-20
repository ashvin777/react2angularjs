import ReactDirective from './react-directive';

export default function reactToAngularjs(ReactComponent, propNames = []) {
  return ['$compile', $compile => {
    return new ReactDirective(ReactComponent, propNames, $compile);
  }];
}