angular.module("arcaneledger")
	.filter('keywordFilter', function(){
		return function(items, sortObject){
			var filtered = [];
			var keywords = sortObject.keywords;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(item.keywords.slot === keywords.slot || item.keywords.slot === ''){
					if(item.keywords.class === keywords.class || item.keywords.class === ''){
						if(item.keywords.rarity === keywords.rarity || item.keywords.rarity === ''){
							filtered.push(item);
						}
					}
				}
			}
			return filtered;
		};
	})
	.filter('itemFilter', function(){
		return function(items, itemSort){
			var filtered = [];
			var keywords = itemSort.keywords;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if(item.name.indexOf(itemSort.name) > -1){
					if(!keywords || (!keywords.slot && !keywords.class && !keywords.rarity)){
						filtered.push(item);
					} else if(item.keywords.slot === keywords.slot){
						filtered.push(item);
					} else if(item.keywords.class === keywords.class){
						filtered.push(item);
					} else if(item.keywords.rarity === keywords.rarity){
						filtered.push(item);
					}
				}
			}
			return filtered;
		};
	})
	.filter('auctionFilter', function(){
		return function(auctions, auctionSort){
			var filtered = [];
			if(auctionSort.item){
				var keywords = auctionSort.item.keywords;
				for (var i = 0; i < auctions.length; i++) {
					var auction = auctions[i];
					
					if(auction.item.name.indexOf(auctionSort.item.name) > -1){
						
						if(auction.level >= auctionSort.level.min)
						if(!auctionSort.level.max || (auction.level <= auctionSort.level.max))
						if(auction.price >= auctionSort.price.min)
						if(!auctionSort.price.max || (auction.price <= auctionSort.price.max))
							
						if(auction.item.keywords.slot === keywords.slot){
							filtered.push(auction);
						} else if(auction.item.keywords.class === keywords.class){
							filtered.push(auction);
						} else if(auction.item.keywords.rarity === keywords.rarity){
							filtered.push(auction);
						} else if(!keywords || (!keywords.slot && !keywords.class && !keywords.rarity)){
							filtered.push(auction);
						}
					}
				}
			}
			return filtered;
		};
	});