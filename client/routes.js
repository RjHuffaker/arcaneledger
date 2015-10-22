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
        controller: 'AuctionCtrl'
      })
      .state('auctions.add', {
        url: '/add',
        views: {
          'addAuctionModal': {
            templateUrl: 'client/views/modals/add-auction.ng.html'
          }
        }
      })
      .state('auctions.edit', {
        url: '/edit',
        views: {
          'editAuctionModal': {
            templateUrl: 'client/views/modals/edit-auction.ng.html'
          }
        }
      })
      .state('items', {
        url: '/items',
        templateUrl: 'client/views/item-search.ng.html',
        controller: 'ItemCtrl'
      })
      .state('items.add', {
        url: '/add',
        views: {
          'addItemModal': {
            templateUrl: 'client/views/modals/add-item.ng.html'
          }
        }
      })
      .state('items.edit', {
        url: '/edit',
        views: {
          'editItemModal': {
            templateUrl: 'client/views/modals/edit-item.ng.html'
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