import angular from 'angular';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import react2angularjs from 'react2angularjs';

console.log(Button, Object.keys(Button.Naked.propTypes));

angular
  .module('myApp', [])
  .directive(
    'reactSelect',
    react2angularjs(Select, ['value', 'id', 'onChange', 'labelId'])
  )
  .directive('menuItem', react2angularjs(MenuItem, Object.keys(MenuItem.Naked.propTypes)))
  .directive('inputLabel', react2angularjs(InputLabel, Object.keys(InputLabel.Naked.propTypes)))
  .directive('reactPopover', react2angularjs(Popover, Object.keys(Popover.Naked.propTypes)))
  .directive('reactButton', react2angularjs(Button, [...Object.keys(Button.Naked.propTypes), 'onClick']))
  .directive('reactTypography', react2angularjs(Typography, Object.keys(Typography.Naked.propTypes)))

  .controller('myController', function($scope) {
    this.age = 30;
    this.open = false;
    this.anchorEl = null;

    this.handleChange = ({ target }) => {
      this.age = target.value;
      $scope.$apply();
    };

    this.handleClick = ({ currentTarget }) => {
      this.open = true;
      this.anchorEl = currentTarget;
      $scope.$apply();
      console.log('clicked')
    }
  });
