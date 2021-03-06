var app = angular.module('cs');

app.controller('UserDetailController', function($scope, authService, $location, $firebase, firebaseService, $ionicSideMenuDelegate, $stateParams, $ionicHistory) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  var exploreRef = new Firebase('https://cancer.firebaseio.com/app/');
  var sync = $firebase(exploreRef);

    $scope.isActive = function(route) {
        return route === $location.path();
    }

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.editUser = function() {
    $location.path('/edit', {}, {reload: true});
  }

  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
  };

  $scope.logout = function() {
    authService.logout();
    $location.path('/login', {}, {reload: true});
  }

  $scope.user = firebaseService.getUser($stateParams.id);


  $scope.authInfo = '';
  $scope.authInfo = authService.getCurrentUser();

  $scope.currentUser = firebaseService.getUser($scope.authInfo.uid);

  if(!$scope.authInfo) {
    $location.path('/login', {}, {reload: true});
  }

console.log($scope.authInfo);
  // ADD FRIENDS AND SHIT

    $scope.addFriend = function() {
        firebaseService.addFriend($scope.authInfo.uid, $stateParams.id, "sent", $scope.user.name);
        firebaseService.addFriend($stateParams.id, $scope.authInfo.uid, "received", $scope.currentUser.name);  
    }


});