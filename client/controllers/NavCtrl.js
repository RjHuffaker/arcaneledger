angular.module("arcaneledger")
	.controller("NavCtrl", ['$rootScope', '$scope', '$meteor',
	function($rootScope, $scope, $meteor){
		
    $scope.error = '';
    
    $scope.register = function(){
      $meteor.createUser($scope.credentials).then(
        function(){
          console.log('new user registered');
        },
        function(err){
          $scope.error = 'Registration error - ' + err;
        }
      );
    };
    
    $scope.login = function(){
      $meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password).then(
        function(){
          console.log('user logged in');
        },
        function (err) {
          $scope.error = 'Login error - ' + err;
        }
      );
    };
		
		$scope.logout = function(){
			$meteor.logout().then(
        function () {
          console.log('user logged out');
        },
        function (err) {
          $scope.error = 'Logout error - ' + err;
        }
      );
		};
		
	}]);