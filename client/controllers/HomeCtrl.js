angular.module("arcaneledger")
	.controller("HomeCtrl", ['$scope', '$meteor',
	function($scope, $meteor){
		
		$scope.auctions = $meteor.collection(Auctions);
		
		$scope.newAuction = { 
			item: "", price: 105, level: 1
		};
		
		$scope.auctionQuery = {
			item: "",
			price: { min: 105 },
			level: { min: 1 }
		};
		
		$scope.browseAuctions = function(query){
			var queryArray = [];
			
			if(query.item !== ""){
				queryArray.push({item: {$regex: '.*'+query.item+'.*'}});
			}
			
			if(query.price.max){
				queryArray.push({
					price: {
						$gt: query.price.min,
						$lt: query.price.max
					}});
			} else {
				queryArray.push({
					price: {
						$gt: query.price.min
					}});
			}
			
			if(query.level.max){
				queryArray.push({
					level: {
						$gt: query.level.min,
						$lt: query.level.max
					}});
			} else {
				queryArray.push({
					level: {
						$gt: query.level.min
					}});
			}
			
			for (var key in query.keywords){
				if(query.keywords[key] !== ""){
					var tempObj = {};
				  tempObj[key] = query.keywords[key];
				  queryArray.push(tempObj);
				}
			}
			
			console.log(queryArray);
			
			if(queryArray.length){
				$scope.auctions = Auctions.find({$and: queryArray}).fetch();
			} else {
				$scope.auctions = Auctions.find({}).fetch();
			}
		};
		
		$scope.addAuction = function(auction){
			if(auction.item === "") return;
			auction.date = Date.now();
			Auctions.insert(auction);
			$scope.newAuction = {
				price: 105, level: 1
			};
		};
		
		$scope.deleteAuction = function(auction){
			$scope.auctions.splice($scope.auctions.indexOf(auction), 1);
		};
		
	}]);