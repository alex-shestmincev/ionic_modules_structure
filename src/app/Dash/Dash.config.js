angular.module('starter')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'build/html/Dash/Dash.tpl.html',
            controller: 'DashCtrl'
          }
        }
      })
  });
