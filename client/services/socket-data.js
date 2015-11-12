angular.module("arcaneledger")
	.factory("socketData", [
		function(){
			
			var service = {};
			
			service.jewelQualityList = [
				{
					name: 'Cracked',
					quantity: 1,
					price: 105,
					downgrade: 10,
					upgrade: 30,
					delay: 200
				},
				{
					name: 'Damaged',
					quantity: 3,
					price: 345,
					downgrade: 30,
					upgrade: 100,
					delay: 175
				},
				{
					name: 'Weak',
					quantity: 9,
					price: 1135,
					downgrade: 100,
					upgrade: 300,
					delay: 150
				},
				{
					name: 'Standard',
					quantity: 27,
					price: 3705,
					downgrade: 300,
					upgrade: 700,
					delay: 125
				},
				{
					name: 'Fortified',
					quantity: 81,
					price: 11815,
					downgrade: 700,
					upgrade: 1500,
					delay: 100
				},
				{
					name: 'Excellent',
					quantity: 243,
					price: 36945,
					downgrade: 1500,
					upgrade: 3400,
					delay: 75
				},
				{
					name: 'Superb',
					quantity: 729,
					price: 114235,
					downgrade: 3400,
					upgrade: 10500,
					delay: 50
				},
				{
					name: 'Noble',
					quantity: 2187,
					price: 353205,
					downgrade: 10500,
					upgrade: 0,
					delay: 25
				}
			];
			
			service.socketList = [
				{quality: '', category: 'Gem'},
				{quality: 'Grand', category: 'Gem'},
				{quality: 'Cracked', category: 'Jewel'},
				{quality: 'Damaged', category: 'Jewel'},
				{quality: 'Weak', category: 'Jewel'},
				{quality: 'Standard', category: 'Jewel'},
				{quality: 'Fortified', category: 'Jewel'},
				{quality: 'Excellent', category: 'Jewel'},
				{quality: 'Superior', category: 'Jewel'},
				{quality: 'Noble', category: 'Jewel'}
			];
			
			service.grandGemList = ['Fire', 'Blood', 'Glacial', 'Tarlok\'s Rage', 'Tarlok\'s Wind', 'Tarlok\'s Wisdom', 'Reinforced Fire', 'Reinforced Blood', 'Reinforced Glacial', 'Elondrian', 'Necropolis Cursed Skull'];
			
			service.gemList = ['Paracelsus Soul Stone', 'Enchanted Eye Of Syrillax'];
			
			service.jewelTypeList = ['Chaos', 'Diamond', 'Finesse', 'Fury', 'Lightning', 'Mind', 'Nature', 'Water'];
			
			return service;
			
		}]);