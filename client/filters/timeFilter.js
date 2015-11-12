angular.module("arcaneledger")
	.filter('timeFilter', function(){
		return function(time){
			
			var second = 1000;
			
			var minute = 60 * second;
			
			var hour = 60 * minute;
			
			var day = 24 * hour;
			
			var month = 30 * day;
			
			var year = 365 * day;
			
			if(time > 2 * year){
				return Math.round(time/year)+' years';
			} else if(time > year){
				return Math.round(time/year)+' year';
			} else if(time > 2 * month){
				return Math.round(time/month)+' months';
			} else if(time > month){
				return Math.round(time/month)+' month';
			} else if(time > 2 * day){
				return Math.round(time/day)+' days';
			} else if(time > day){
				return Math.round(time/day)+' day';
			} else if(time > hour * 2){
				return Math.round(time/hour)+' hours';
			} else if(time > hour){
				return Math.round(time/hour)+' hour';
			} else if(time > minute * 2){
				return Math.round(time/minute)+' minutes';
			} else if(time > minute){
				return Math.round(time/minute)+' minute';
			} else if(time > second){
				return Math.round(time/second)+' seconds';
			}
		};
	});