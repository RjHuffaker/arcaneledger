angular.module("arcaneledger")
	.controller("HomeCtrl", ['$rootScope', '$scope', '$meteor',
	function($rootScope, $scope, $meteor){
		
		$scope.slotList = ['Weapon', 'Helmet', 'Armor', 'Belt', 'Ring', 'Amulet', 'Jewel', 'chest', 'Egg', 'Vanity Helmet', 'Vanity Armor', 'Banner'];
		
		$scope.classList = ['Warrior', 'Rogue', 'Sorceror'];
		
		$scope.rarityList = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Arcane'];
		
		// Scope Auction Variables
		$scope.auctionList = $meteor.collection(Auctions);
		
		$scope.newAuction = { 
			item: {
				name: '',
				keywords: {
					slot: '',
					class: '',
					rarity: ''
				}
			},
			price: 105,
			level: 1
		};
		
		$scope.auctionSort = {
			item: {
				name: '',
				keywords: {
					slot: null,
					class: null,
					rarity: null
				}
			},
			price: { min: 105 },
			level: { min: 1 }
		};
		
		$scope.resetAuction = function(){
			$scope.auctionSort = {
				item: {
					name: '',
					keywords: {
						slot: '',
						class: '',
						rarity: ''
					}
				},
				price: { min: 105 },
				level: { min: 1 }
			};
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
		
		$scope.addAuction = function(auction){
			auction.owner = $rootScope.currentUser._id;
			auction.date = Date.now();
			delete auction.item.$$hashKey;
			console.log(auction);
			Auctions.insert(auction);
			$scope.newAuction = {
				item: {
					name: '',
					keywords: {
						slot: '',
						class: '',
						rarity: ''
					}
				},
				price: 105,
				level: 1
			};
		};
		
		$scope.deleteAuction = function(auction){
			$scope.auctionList.splice($scope.auctionList.indexOf(auction), 1);
		};
		
		// Scope Item Variables
		$scope.itemList = $meteor.collection(Items);
		
		$scope.newItem = { 
			name: '',
			keywords: {
				slot: '',
				class: '',
				rarity: ''
			}
		};
		
		$scope.itemSort = {
			name: '',
			keywords: {
				slot: null,
				class: null,
				rarity: null
			}
		};
		
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
		
		$scope.addItem = function(item){
			if(item.name === '') return;
			item.owner = $rootScope.currentUser._id;
			item.date = Date.now();
			Items.insert(item);
			$scope.newItem = {
				name: '',
				keywords: {
					slot: null,
					class: null,
					rarity: null
				}
			};
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
		
	}]);