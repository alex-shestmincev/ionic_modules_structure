angular.module('starter')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab.chat', {
        url: '/chat',
        views: {
          'tab-chat': {
            templateUrl: 'build/html/Chat/Chat.tpl.html',
            controller: 'ChatCtrl'
          }
        }
      })
  });
