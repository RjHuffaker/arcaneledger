angular.module("arcaneledger")
	.controller("AuctionDetailsCtrl", ['$rootScope', '$scope', '$stateParams', '$meteor', 'socketData',
		function($rootScope, $scope, $stateParams, $meteor, socketData){
			
			$scope.socketData = socketData;
			
			
			$scope.saveAuction = function(auction) {
				if(auction._id){
					auction.save().then(function(numberOfDocs){
						console.log('save success doc affected ', numberOfDocs);
					}, function(error){
						console.log('save error', error);
					});
				} else {
					auction.owner = $rootScope.currentUser._id;
					auction.date = Date.now();
					delete auction.item.$$hashKey;
					$scope.auctionList.push(auction);
				}
			};
			
			$scope.setSockets = function(auction){
				var newLength = 0;
				
				if(['Weapon', 'Helment', 'Armor', 'Ring', 'Amulet'].indexOf(auction.item.keywords.slot) > -1){
					switch(auction.item.keywords.rarity){
						case 'Epic':
							newLength = 1;
							break;
						case 'Legendary':
							newLength = 2;
							break;
						case 'Mythic':
							newLength = 3;
							break;
						case 'Arcane':
							newLength = 3;
							break;
					}
				}
				
				while(newLength > auction.sockets.length){
					auction.sockets.push({ quality: '', type: '', category: '' });
					console.log('push');
				}
				
				while(newLength < auction.sockets.length){
					auction.sockets.pop();
					console.log('pop');
				}
			};
			
			if($stateParams.auctionId === 'new'){
				$scope.viewAuction = {
					item: {
						name: '',
						keywords: {
							slot: '',
							class: '',
							rarity: ''
						}
					},
					price: 105,
					level: 1,
					sockets: [{ quality: '', type: '', category: '' }]
				};
			} else {
				$scope.viewAuction = $meteor.object(Auctions, $stateParams.auctionId, false);
			}
			
			
		}]);