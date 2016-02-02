angular.module('starter')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'build/html/Account/Account.tpl.html',
            controller: 'AccountCtrl'
          }
        }
      });
  });
