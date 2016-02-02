angular.module('starter.controllers', [])
  .controller('AppCtrl', function($scope, $state) {
    $scope.goTo = function goTo(name,options) {
      $state.go(name, options);
    }
  });
