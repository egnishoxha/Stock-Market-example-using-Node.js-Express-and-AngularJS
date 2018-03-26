(function() {
    'use strict';
    angular
        .module("myApp")
        .service("traderService", function($http){
			this.getItems = function(){
				return $http.get('/getList');
			}
		});
})();
