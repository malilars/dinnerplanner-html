
var DishDetailController = function(view, model, app) {
    "use strict";

    view.getContainer().on('click', '#addToMenuButton', function() {
        var chosenDishId = $(this).attr("chosenDish");
        model.addDishToMenu(chosenDishId);
    });
    
    view.getContainer().on('click', '#backToSearchViewButton', function(){
        app.goToSelectDish(view.getContainer());

    });
};

