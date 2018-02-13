var HomeController = function(homeView, model, app) {

    "use strict";

    homeView.getCreateDinnerButton().click(function(){
        app.goToSelectDish(homeView.getContainer());
    });

};