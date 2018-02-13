var DinnerOverviewController = function(dinnerOverviewView, model, app) {

    dinnerOverviewView.getGoBackEditDinnerButton().click(function(){
     
        app.goToSelectDish(dinnerOverviewView.getContainer());

    });

    dinnerOverviewView.getPrintFullRecipeButton().click(function(){
        app.goToFullRecipe();
    });

};