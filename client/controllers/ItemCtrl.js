angular.module("arcaneledger")
	.controller("ItemCtrl", ['$location', '$rootScope', '$scope', '$meteor', 'itemData',
	function($location, $rootScope, $scope, $meteor, itemData){
		
		$scope.itemData = itemData;
		
		$scope.sortReverse = true;
		
		$scope.currentRow = {};
		
		$scope.selectRow = function(auction){
			$scope.currentRow = auction;
		};
		
		// Scope Item Variables
		$scope.itemList = $meteor.collection(Items);
		
		$scope.itemSort = itemData.blankItemSort;
		
		$scope.viewItem = itemData.blankItem;
		
		// Item BREAD
		$scope.browseItems = function(query){
			
			var queryArray = [];
			
			if(query.keywords.slot !== ''){
				queryArray.push({'keywords.slot': query.keywords.slot});
			}
			if(query.keywords.class !== ''){
				queryArray.push({'keywords.class': query.keywords.class});
			}
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
		
		$scope.readItem = function(item){
			if(item){
				$scope.viewItem.name = item.name;
				$scope.viewItem.keywords.slot = item.keywords.slot;
				$scope.viewItem.keywords.class = item.keywords.class;
				$scope.viewItem.keywords.rarity = item.keywords.rarity;
				$location.path('/items/edit');
			} else {
				$scope.viewItem.name = "";
				$scope.viewItem.keywords.slot = "";
				$scope.viewItem.keywords.class = "";
				$scope.viewItem.keywords.rarity = "";
				$location.path('/items/add');
			}
		};
		
		$scope.editItem = function(item){
			$scope.currentRow.name = item.name;
			$scope.currentRow.keywords.slot = item.keywords.slot;
			$scope.currentRow.keywords.class = item.keywords.class;
			$scope.currentRow.keywords.rarity = item.keywords.rarity;
			$location.path('/items');
		};
		
		$scope.addItem = function(item){
			if(item.name === '') return;
			item.owner = $rootScope.currentUser._id;
			item.date = Date.now();
			Items.insert(item);
			$scope.viewItem = itemData.blankItem;
			$location.path('/items');
		};
		
		$scope.deleteItem = function(item){
			$scope.itemList.splice($scope.itemList.indexOf(item), 1);
		};
		
		$scope.setItemQuery = function(item){
			if(!item) return;
			$scope.itemSort.keywords.slot = item.keywords.slot;
			$scope.itemSort.keywords.class = item.keywords.class;
			$scope.itemSort.keywords.rarity = item.keywords.rarity;
		};
		
		$scope.cancelItem = function(){
			$scope.newItem = itemData.blankItem;
			$scope.itemSort = itemData.blankItemSort;
			$location.path('/items');
		};
		
	}]);