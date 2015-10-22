angular.module("arcaneledger")
	.factory("itemData", [
		function(){
			var service = {};
			
			service.blankItem = {
				name: '',
				keywords: {
					slot: '',
					class: '',
					rarity: ''
				}
			};
			
			service.blankItemSort = {
				name: '',
				keywords: {
					slot: null,
					class: null,
					rarity: null
				}
			};
			
			service.slotList = ['Weapon', 'Helmet', 'Armor', 'Belt', 'Ring', 'Amulet', 'Crafting Item', 'Chest', 'Vanity Weapon', 'Vanity Helmet', 'Vanity Armor', 'Banner', 'Back'];
			
			service.classList = ['Warrior', 'Rogue', 'Sorceror'];
			
			service.rarityList = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Arcane'];
			
			service.subtypeList = [
				{ keyword: 'Shield', prereqs: [ 'Weapon', 'Warrior' ] },
				{ keyword: 'Bow', prereqs: [ 'Weapon', 'Rogue' ] },
				{ keyword: 'Gun', prereqs: [ 'Weapon', 'Sorceror' ] },
				{ keyword: 'Gem', prereqs: [ 'Crafting Item' ] },
				{ keyword: 'Jewel', prereqs: [ 'Crafting Item' ] },
				{ keyword: 'Egg', prereqs: [ 'Chest' ] }
			];
			
			service.socketTypeList = ['Gem', 'Jewel'];
			
			service.socketObjects = [
				{name: 'Fire Gem', type: 'Gem', id: 1},
				{name: 'Blood Gem', type: 'Gem', id: 2},
				{name: 'Glacial Gem', type: 'Gem', id: 3},
				{name: 'Tarloks Rage Gem', type: 'Gem', id: 4},
				{name: 'Tarloks Wind Gem', type: 'Gem', id: 5},
				{name: 'Tarloks Wisdom Gem Gem', type: 'Gem', id: 6},
				{name: 'Reinforced Fire Gem', type: 'Gem', id: 7},
				{name: 'Reinforced Blood Gem', type: 'Gem', id: 8},
				{name: 'Reinforced Glacia Gem', type: 'Gem', id: 9},
				{name: 'Elondrian Gem', type: 'Gem', id: 10},
				{name: 'Necropolis Cursed Skull', type: 'Gem', id: 11},
				{name: 'Paracelsus Soul Stone', type: 'Gem', id: 12},
				{name: 'Enchanted Eye of Syrillax', type: 'Gem', id: 13},
				{name: 'Chaos Jewel', type: 'Jewel', id: 14},
				{name: 'Diamond Jewel', type: 'Jewel', id: 15},
				{name: 'Finesse Jewel', type: 'Jewel', id: 16},
				{name: 'Fury Jewel', type: 'Jewel', id: 17},
				{name: 'Lightning Jewel', type: 'Jewel', id: 18},
				{name: 'Mind Jewel', type: 'Jewel', id: 19},
				{name: 'Nature Jewel', type: 'Jewel', id: 20},
				{name: 'Water Jewel', type: 'Jewel', id: 21}
			];
			
			service.gemList = ['Fire', 'Blood', 'Glacial', 'Tarloks Rage', 'Tarloks Wind', 'Tarloks Wisdom', 'Reinforced Fire', 'Reinforced Blood', 'Reinforced Glacial', 'Paracelsus Soul Stone', 'Elondrian', 'Enchanted Eye of Syrillax', 'Necropolis Cursed Skull'];
			
			service.jewelList = ['Chaos', 'Diamond', 'Finesse', 'Fury', 'Lightning', 'Mind', 'Nature', 'Water'];
			
			service.socketRankList = [
				{quality: '', type: 'Gem'},
				{quality: 'Grand', type: 'Gem'},
				{quality: 'Cracked', type: 'Jewel'},
				{quality: 'Damaged', type: 'Jewel'},
				{quality: 'Weak', type: 'Jewel'},
				{quality: 'Standard', type: 'Jewel'},
				{quality: 'Fortified', type: 'Jewel'},
				{quality: 'Excellent', type: 'Jewel'},
				{quality: 'Superb', type: 'Jewel'},
				{quality: 'Noble', type: 'Jewel'}
			];
			
			return service;
		}]);