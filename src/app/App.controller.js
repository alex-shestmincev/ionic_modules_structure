angular.module('starter.controllers', [])
  .controller('AppCtrl', function($scope, $state, $ionicSideMenuDelegate) {

    $scope.toggleMenu = function() { console.log('toggleMenu')
      $ionicSideMenuDelegate.toggleLeft();
    };
  });
