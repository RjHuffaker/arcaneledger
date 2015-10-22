angular.module("arcaneledger")
	.controller("JewelCtrl", ['$location', '$rootScope', '$scope', '$meteor', 'socketData',
	function($location, $rootScope, $scope, $meteor, socketData){
		
		$scope.socketData = socketData;
		
		var priceWatcher;
		
		var setValues = function(jewel, cost){
			togglePriceWatcher(false);
			for(var i = jewel; i < 7; i++){
				var baseJewel = $scope.socketData.jewelQualityList[i];
				var newPrice = Math.round((baseJewel.price * 3) + baseJewel.upgrade);
				$scope.socketData.jewelQualityList[i+1].price = newPrice;
			}
			for(var i = jewel; i > 0; i--){
				var baseJewel = $scope.socketData.jewelQualityList[i];
				var newPrice = Math.round((baseJewel.price - baseJewel.downgrade) / 3);
				$scope.socketData.jewelQualityList[i-1].price = newPrice;
			}
			togglePriceWatcher(true);
		};
		
		var togglePriceWatcher = function(enable){
			if(enable){
				priceWatcher = $scope.$watchCollection(function(scope){
					var returnArray = [];
					for(var i = 0; i < scope.socketData.jewelQualityList.length; i++){
						returnArray.push(scope.socketData.jewelQualityList[i].price);
					}
					return returnArray;
				}, function(newVal, oldVal, scope){
					for(var i = 0; i < newVal.length; i++){
						if(newVal[i] !== oldVal[i]){
							setValues(i, newVal[i]);
						}
					}
				});
			} else {
				priceWatcher();
			}
		};
		
		togglePriceWatcher(true);
		
	}]);