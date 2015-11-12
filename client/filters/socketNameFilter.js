angular.module("arcaneledger")
	.filter('socketName', function(){
		return function (text) {
			if(text){
				return text.replace(/[^\w]/g, '');
			} else {
				return 'EmptySocket';
			}
    };
	});