angular.module("arcaneledger")
	.controller("AuctionSearchCtrl", ['$location', '$interval', '$rootScope', '$scope', '$meteor', 'auctionData', 'itemData', 'socketData',
	function($location, $interval, $rootScope, $scope, $meteor, auctionData, itemData, socketData){
		
		$scope.itemData = itemData;
		
		$scope.socketData = socketData;
		
		$scope.sortReverse = true;
		
		$scope.currentRow = {};
		
		$scope.auctionSort = auctionData.blankAuctionSort;
		
		$scope.auctionList = $meteor.collection(Auctions, true).subscribe('auctions');
		
		$scope.itemList = $meteor.collection(Items, true).subscribe('items');
		
		$scope.itemSort = itemData.blankItemSort;
		
		$scope.classSlots = ['Weapon', 'Helmet', 'Armor', 'Vanity Weapon', 'Vanity Helmet', 'Vanity Armor'];
		
		$scope.listStart = 0;
		
		$scope.listShown = 10;
		
		$scope.sortReverse = false;
		
		$scope.currentTime = Date.now();
		
		var checkTime = function(){
			$scope.currentTime = new Date();
		}
		
		$interval(checkTime, 1000);
		
		$scope.traverseList = function(forward, toLimit){
			var listSize = $scope.itemList.length;
			console.log($scope.listStart);
			console.log($scope.listShown);
			if(toLimit){
				if(forward){
					for(var i = 0; i < listSize; i++){
						if($scope.listStart + $scope.listShown < listSize){
							$scope.listStart += $scope.listShown;
						}
						
					}
				} else {
					$scope.listStart = 0;
				}
			} else {
				if(forward){
					if($scope.listStart + $scope.listShown < listSize){
						$scope.listStart += $scope.listShown;
					}
				} else {
					if($scope.listStart > 0){
						$scope.listStart -= $scope.listShown;
					}
				}
			}
		};
		
		$scope.setSortType = function(keyword){
			$scope.sortType = keyword;
			if($scope.sortType === keyword){
				if($scope.sortReverse){
					$scope.sortType = '';
				}
				$scope.sortReverse = !$scope.sortReverse;
			} else {
				$scope.sortReverse = !$scope.sortReverse;
				$scope.sortType = keyword;
			}
		};
		
		$scope.browseAuctions = function(query){
			console.log(query);
			
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
			
			if(query.item.keywords.slot)
			if(query.item.keywords.slot !== ''){
				queryArray.push({'item.keywords.slot': query.item.keywords.slot});
			}
			
			if(query.item.keywords.class)
			if(query.item.keywords.class !== ''){
				queryArray.push({'item.keywords.class': query.item.keywords.class});
			}
			
			if(query.item.keywords.rarity)
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
		
		$scope.deleteAuction = function(auction){
			$scope.auctionList.splice($scope.auctionList.indexOf(auction), 1);
		};
		
		$scope.cancelAuction = function(){
			$location.path('/auctions');
		};
		
		$scope.selectRow = function(auction){
			$scope.currentRow = auction;
		};
		
	}]);