angular.module("arcaneledger")
	.controller("ItemDetailsCtrl", ['$rootScope', '$scope', '$stateParams', '$meteor',
		function($rootScope, $scope, $stateParams, $meteor){
			
			$scope.saveItem = function(item){
				if(item._id){
					item.save().then(function(numberOfDocs){
						console.log('save success doc affected ', numberOfDocs);
					}, function(error){
						console.log('save error', error);
					});
				} else {
					item.owner = $rootScope.currentUser._id;
					item.date = Date.now();
					$scope.itemList.push(item);
				}
			};
			
			if($stateParams.itemId === 'new'){
				$scope.viewItem = {
					name: '',
					keywords: {
						slot: '',
						class: '',
						rarity: ''
					}
				};
			} else {
				$scope.viewItem = $meteor.object(Items, $stateParams.itemId, false);
			}
			
		}]);