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
			
			service.slotList = [
				{ text: 'Weapon' },
				{ text: 'Helmet' },
				{ text: 'Armor' },
				{ text: 'Belt' },
				{ text: 'Ring' },
				{ text: 'Amulet' },
				{ text: 'Crafting Item' },
				{ text: 'Chest' },
				{ text: 'Banner' },
				{ text: 'Back' }
			];
			
			service.classList = [
				{ text: 'Warrior' },
				{ text: 'Rogue' },
				{ text: 'Sorceror' }
			];
			
			service.rarityList = [
				{ text: 'Common' },
				{ text: 'Rare' },
				{ text: 'Epic' },
				{ text: 'Legendary' },
				{ text: 'Mythic' },
				{ text: 'Vanity' },
				{ text: 'Arcane' }
			];
			
			return service;
		}]);