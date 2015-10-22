angular.module("arcaneledger")
	.controller("AuctionCtrl", ['$location', '$rootScope', '$scope', '$meteor', 'auctionData', 'itemData', 'socketData',
	function($location, $rootScope, $scope, $meteor, auctionData, itemData, socketData){
		
		$scope.itemData = itemData;
		
		$scope.socketData = socketData;
		
		$scope.sortReverse = true;
		
		$scope.currentRow = {};
		
		$scope.selectRow = function(auction){
			$scope.currentRow = auction;
		};
		
		// Scope Auction Variables
		$scope.viewAuction = auctionData.blankAuction;
		
		$scope.auctionSort = auctionData.blankAuctionSort;
		
		$scope.auctionList = $meteor.collection(Auctions);
		
		$scope.itemList = $meteor.collection(Items);
		
		$scope.itemSort = itemData.blankItemSort;
				
		$scope.resetAuction = function(){
			$scope.auctionSort = auctionData.blankAuction;
		};
		
		// Auction BREAD
		$scope.browseAuctions = function(query){
			var queryArray = [];
			
			if(query.price.max){
				queryArray.push({
					price: {
						$gt: query.price.min-1,
						$lt: query.price.max+1
					}});
			} else {
				queryArray.push({
					price: {
						$gt: query.price.min-1
					}});
			}
			
			if(query.level.max){
				queryArray.push({
					level: {
						$gt: query.level.min-1,
						$lt: query.level.max+1
					}});
			} else {
				queryArray.push({
					level: {
						$gt: query.level.min-1
					}});
			}
			
			if(query.item.name !== ""){
				queryArray.push({'item.name': {$regex: '.*'+query.item.name+'.*'}});
			}
			
			if(query.item.keywords.slot !== ''){
				queryArray.push({'item.keywords.slot': query.item.keywords.slot});
			}
			
			if(query.item.keywords.class !== ''){
				queryArray.push({'item.keywords.class': query.item.keywords.class});
			}
			
			if(query.item.keywords.rarity !== ''){
				queryArray.push({'item.keywords.rarity': query.item.keywords.rarity});
			}
			
			console.log(queryArray);
			
			if(queryArray.length){
				$scope.auctionList = Auctions.find({$and: queryArray}).fetch();
			} else {
				$scope.auctionList = Auctions.find({}).fetch();
			}
		};
		
		$scope.readAuction = function(auction){
			if(auction){
				
				$scope.viewAuction.item = auction.item;
				$scope.viewAuction.price = auction.price;
				$scope.viewAuction.level = auction.level;
				$scope.viewAuction.sockets = auction.sockets;
				
				$scope.itemSort = { name: '', keywords: { slot: '', class: '', rarity: '' } };
				
				$location.path('/auctions/edit');
			} else {
				$scope.viewAuction = { price: 105, level: 1,
					sockets: [
						{ quality: '', type: '', category: '' },
						{ quality: '', type: '', category: '' },
						{ quality: '', type: '', category: '' }
					]
				};
				$scope.itemSort = { name: '', keywords: { slot: '', class: '', rarity: '' } };
				
				console.log($scope.viewAuction);
				$location.path('/auctions/add');
			}
			
		};
		
		$scope.editAuction = function(auction){
			$scope.currentRow.item = auction.item;
			$scope.currentRow.price = auction.price;
			$scope.currentRow.level = auction.level;
			$scope.currentRow.socket_1 = auction.socket_1;
			$scope.currentRow.socket_2 = auction.socket_2;
			$scope.currentRow.socket_3 = auction.socket_3;
			
			
			$location.path('/auctions');
		};
		
		$scope.addAuction = function(auction){
			auction.owner = $rootScope.currentUser._id;
			auction.date = Date.now();
			delete auction.item.$$hashKey;
			
			console.log(auction);
			
			Auctions.insert(auction);
			$scope.viewAuction = {price: 105, level: 1,
				sockets: [
					{ quality: '', type: '', category: '' },
					{ quality: '', type: '', category: '' },
					{ quality: '', type: '', category: '' }
				]
			};
			$scope.itemSort = { name: '', keywords: { slot: '', class: '', rarity: '' } };
			$location.path('/auctions');
		};
		
		$scope.deleteAuction = function(auction){
			$scope.auctionList.splice($scope.auctionList.indexOf(auction), 1);
		};
		
		$scope.cancelAuction = function(){
			$scope.viewAuction = {price: 105, level: 1,
				sockets: [
					{ quality: '', type: '', category: '' },
					{ quality: '', type: '', category: '' },
					{ quality: '', type: '', category: '' }
				]
			};
			$scope.itemSort = { name: '', keywords: { slot: '', class: '', rarity: '' } };
			$location.path('/auctions');
		};
		
		$scope.setSockets = function(auction){
			var socketItems = ['Weapon', 'Helment', 'Armor', 'Ring', 'Amulet'];
			var rarity = auction.item.keywords.rarity;
			
			if(socketItems.indexOf(auction.item.keywords.slot) > -1){
				if(rarity === ''){
					auction.sockets.length = 0;
				} else if(rarity === 'Common'){
					auction.sockets.length = 0;
				} else if(rarity === 'Rare'){
					auction.sockets.length = 0;
				} else if(rarity === 'Epic'){
					auction.sockets.length = 1;
				} else if(rarity === 'Legendary'){
					auction.sockets.length = 2;
				} else if(rarity === 'Mythic'){
					auction.sockets.length = 3;
				} else if(rarity === 'Vanity'){
					auction.sockets.length = 0;
				} else if(rarity === 'Arcane'){
					auction.sockets.length = 3;
				}
			} else {
				auction.sockets.length = 0;
			}
			
		};
		
	}]);