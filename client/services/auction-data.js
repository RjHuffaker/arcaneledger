angular.module("arcaneledger")
	.factory("auctionData", [
		function(){
			var service = {};
			
			service.blankAuction = {
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
				sockets: [
					{ quality: '', type: '', category: '' },
					{ quality: '', type: '', category: '' },
					{ quality: '', type: '', category: '' }
				]
			};
			
			service.blankAuctionSort = {
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
			
			return service;
		}]);