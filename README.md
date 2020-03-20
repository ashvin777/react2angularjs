# Use React in Angular along with Transclusion/Children

## Installation
`npm install --save react2angularjs`

## How to use

```
import react2angularjs from 'react2angularjs';

angular.module('app', [])
  .directive('ReactComponent1', react2angularjs(ReactComponent, ['prop1', 'prop2']))
  .directive('ReactInput', react2angularjs(ReactInput, ['value', 'onChange']))

```


## Using in Angularjs Template

```
<react-input default-value="'123'" value="$ctrl.value" on-change="$ctrl.onChange" >
  ...
</react-input>

```

## Transclusion

```
import react2angularjs from 'react2angularjs';
import Tooltip from 'rc-tooltip';

angular.module('app', [])
  .directive('reactTooltip', react2angularjs(Tooltip, ['placement', 'overlay']))

```

Using in Angular template
```
<react-tooltip placement="'right'" overlay="'tooltip message'">
  <button ng-click="$ctrl.onSignInClicked()">Sign in</button>
</react-tooltip>
```

Event callback
```
<react-tooltip placement="'right'" overlay="'tooltip message'" on-close="$ctrl.onClose">
  <button ng-click="$ctrl.onSignInClicked()">Sign in</button>
</react-tooltip>
```

## Live Demo

[CodeSandbox](https://codesandbox.io/s/react-2-angularjs-uttki) - https://codesandbox.io/s/react-2-angularjs-uttki