var app = angular.module('cs');

app.controller('UserController', function($scope, firebaseService, authService, ipCookie, $firebase, $location) {
    $scope.user = authService.getCurrentUser();
    var userRef = new Firebase('https://cancer.firebaseio.com/users/' + $scope.user.uid);
    var sync = $firebase(userRef);

    $scope.userData = sync.$asObject();

    $scope.addData = function(user) {
      sync.$update({
        bio: user.bio,
        cancer: user.cancer,
        name: user.name,
        level: user.level
      });
      $location.path('/explore')
    }    


  
  
});