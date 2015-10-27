angular.module("arcaneledger")
	.filter('nospace', function(){
		return function (text) {
			return text.replace(/\s+/g, '');
    };
	});