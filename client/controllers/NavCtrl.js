angular.module("arcaneledger")
	.controller("NavCtrl", ['$rootScope', '$scope', '$meteor',
	function($rootScope, $scope, $meteor){
		
    $scope.error = '';
    
    $scope.register = function () {
      $meteor.createUser($scope.credentials).then(
        function () {
          console.log('new user registered');
        },
        function (err) {
          $scope.credentials.username = '';
          $scope.credentials.password = '';
          $scope.registerError = 'Registration Error';
        }
      );
    };
    
    $scope.login = function () {
      $meteor.loginWithPassword($scope.credentials.username, $scope.credentials.password).then(
        function () {
          console.log('user logged in');
        },
        function (err) {
          $scope.credentials.username = '';
          $scope.credentials.password = '';
          $scope.loginError = 'Login Error';
        }
      );
    };
		
		$scope.logout = function(){
			$meteor.logout().then(
        function () {
          console.log('user logged out');
        },
        function (err) {
          $scope.logoutError = 'Logout Error';
        }
      );
		};
		
	}]);