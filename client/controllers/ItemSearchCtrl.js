angular.module("arcaneledger")
	.controller("ItemSearchCtrl", ['$location', '$interval', '$rootScope', '$scope', '$meteor', 'itemData',
	function($location, $interval, $rootScope, $scope, $meteor, itemData){
		
		$scope.itemData = itemData;
		
		$scope.sortReverse = true;
		
		$scope.currentRow = {};
		
		$scope.itemList = $meteor.collection(Items, true).subscribe('items');
		
		$scope.itemSort = itemData.blankItemSort;
		
		$scope.viewItem = itemData.blankItem;
		
		$scope.listStart = 0;
		
		$scope.listShown = 10;
		
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
		
		
		$scope.browseItems = function(query){
			console.log(query);
			
			var queryArray = [];
			
			if(query.name !== ""){
				queryArray.push({'name': {$regex: '.*'+query.name+'.*'}});
			}
			
			if(query.keywords.slot)
			if(query.keywords.slot !== ''){
				queryArray.push({'keywords.slot': query.keywords.slot});
			}
			
			if(query.keywords.class)
			if(query.keywords.class !== ''){
				queryArray.push({'keywords.class': query.keywords.class});
			}
			
			if(query.keywords.rarity)
			if(query.keywords.rarity !== ''){
				queryArray.push({'keywords.rarity': query.keywords.rarity});
			}
			
			console.log(queryArray);
			
			if(queryArray.length){
				$scope.itemList = Items.find({$and: queryArray}).fetch();
			} else {
				$scope.itemList = Items.find({}).fetch();
			}
		};
		
		
		$scope.deleteItem = function(item){
			$scope.itemList.splice($scope.itemList.indexOf(item), 1);
		};
		
		$scope.cancelItem = function(){
			$location.path('/items');
		};
		
		$scope.selectRow = function(auction){
			$scope.currentRow = auction;
		};
		
	}]);