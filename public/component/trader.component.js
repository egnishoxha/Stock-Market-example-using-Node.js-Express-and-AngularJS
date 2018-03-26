(function() {
    'use strict';

    //Controller
    var TraderController = function($interval, traderService) {
        var ctrl = this;

		var stocks = [];

        this.$onInit = function(){
            traderService.getItems()
            .then(function(d){
				stocks = d.data;
		    });
        }
        
		
		ctrl.changeStock = function(){
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
		//ctrl.changeStock = changeStock;
		ctrl.changeStock();

		$interval(function(){
			ctrl.changeStock();
			ctrl.stocks = stocks;		
		},2000);

    }
    
    //Component
    var TraderComponent = {
        templateUrl: "component/trader.tpl.html",
        controller: TraderController,
        controllerAs: "ctrl",
        bindings: {

        }
    }
    
    angular
        .module("myApp")
        .component("traderComponent", TraderComponent);
})();