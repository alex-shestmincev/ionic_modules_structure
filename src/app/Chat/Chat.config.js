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
      .state('tab.chat-Detail', {
        url: '/chat/:chatId',
        views: {
          'tab-chat': {
            templateUrl: 'build/html/Chat/Detail/ChatDetail.tpl.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })
  });
