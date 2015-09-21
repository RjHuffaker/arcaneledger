angular.module('arcaneledger').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',

  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/views/home.ng.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
    
  }]);