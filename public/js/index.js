var app = angular.module('myapp', []);
app.controller('ctrl_1', function ($scope, $http){
	var stocks=[];
	$http.get('/getList').
    	then(function(d){
        	console.log(d.data);
        	stocks=d.data;
  	});
    //simulate stock change
    function changeStock(){
    	stocks.forEach(function(stock){
	    	stock.last = stock.open;
	    	stock.high = stock.open;
	    	stock.low = stock.open;
	    	stock.ch = "";
	    	stock.cc="";
	    	stock.iconClass="";
		
	    	var index = Math.floor(Math.random() * stocks.length);
	        var stock = stocks[index];

	        var maxChange = stock.open * 0.005;
	        var change = maxChange - Math.random() * maxChange * 2;
	        var last;

		    var change = Math.round(change * 100) / 100;
		    var change = change === 0 ? 0.01 : change;

		    last = stock.last + change;

		    if (last > stock.open * 1.15 || last < stock.open * 0.85){
		        change = -change;
		        last = stock.last + change;
		    }

		    stock.change = change;
		    stock.last = Math.round(last * 100) / 100;
		    if (stock.last > stock.high){
		        stock.high = stock.last;
		        stock.cc="change-positive";
		        stock.iconClass="glyphicon glyphicon-triangle-top"
		        stock.ch="last-positive";
		    }
		    if(stock.last < stock.low){
		        stock.low = stock.last;
		        stock.cc="change-negative";
		        stock.iconClass="glyphicon glyphicon-triangle-bottom"
		        stock.ch="last-negative";
		    }
	    });
	}
    $scope.changeStock=changeStock;
    $scope.changeStock();

    setInterval(function(){
		$scope.changeStock();
		$scope.stocks=stocks;		
		$scope.$apply();
	},2000);
});
