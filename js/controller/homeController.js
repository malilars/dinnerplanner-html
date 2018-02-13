var HomeController = function(homeView, model, app) {


    homeView.getCreateDinnerButton().click(function(){
        app.goToSelectDish(homeView.getContainer());
    });

};