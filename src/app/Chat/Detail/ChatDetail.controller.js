angular.module('starter.controllers')
  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) { console.log('ChatDetailCtrl')
    $scope.chat = Chats.get($stateParams.chatId);
  });
