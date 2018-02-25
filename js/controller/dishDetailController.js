
var DishDetailController = function(view, model, app) {
    "use strict";

    view.getContainer().on('click', '#addToMenuButton', function() {

        model.addDishToMenu(view.getCurrentDish());

    });
    
    view.getContainer().on('click', '#backToSearchViewButton', function(){
        app.goToSelectDish(view.getContainer());

    });
};

