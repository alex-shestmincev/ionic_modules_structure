angular.module('starter.controllers')
  .controller('ChatCtrl', function($scope, Chats) { console.log('ChatCtr1123ghfg');
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })
