angular.module('arcaneledger').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',

  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/views/home.ng.html'
      })
      .state('auctions', {
        url: '/auctions',
        templateUrl: 'client/views/auction-search.ng.html',
        controller: 'AuctionSearchCtrl'
      })
      .state('auctions.details', {
        url: '/:auctionId',
        views: {
          'auctionDetailsModal': {
            templateUrl: 'client/views/modals/auction-details.ng.html',
            controller: 'AuctionDetailsCtrl'
          }
        }
      })
      .state('items', {
        url: '/items',
        templateUrl: 'client/views/item-search.ng.html',
        controller: 'ItemSearchCtrl'
      })
      .state('items.details', {
        url: '/:itemId',
        views: {
          'itemDetailsModal': {
            templateUrl: 'client/views/modals/item-details.ng.html',
            controller: 'ItemDetailsCtrl'
          }
        }
      })
      .state('jewels', {
        url: '/jewels',
        templateUrl: 'client/views/jewels.ng.html',
        controller: 'JewelCtrl'
      });

    $urlRouterProvider.otherwise('/');
    
  }]);