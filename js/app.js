$(function() {

    "use strict";

	//We instantiate our model
	var model = new DinnerModel();

    // All the html- element
    var selectDishElement = $("#select-dish");
    var dinnerMenuElement = $("#dinner-menu");
    var dinnerOverviewElement = $("#dinner-overview");
    var dinnerPrintoutElement = $("#dinner-printout");
    var dishDetailsElement = $("#dish-details");
    var homeElement = $("#home");

    //Create the views
    var selectDishView = new SelectDishView(selectDishElement, model);
    var dinnerMenuView = new DinnerMenuView(dinnerMenuElement, model);
    var dinnerOverviewView = new DinnerOverviewView(dinnerOverviewElement, model);
    var dinnerPrintoutView = new DinnerPrintoutView(dinnerPrintoutElement, model);
    var homeView = new HomeView(homeElement, model);
    var dishDetailsView = new DishDetailsView(dishDetailsElement, model);

    //start with showing the home view
    homeElement.show();

    //Create the controllers
    var homeController = new HomeController(homeView, model, this);
    var selectDishController = new SelectDishController(selectDishView, model,this);
    var menuViewController = new MenuViewController(dinnerMenuView, model, this);
    var dishDetailController = new DishDetailController(dishDetailsView, model, this);
    var dinnerOverviewController = new DinnerOverviewController(dinnerOverviewView, model, this);
    var dinnerPrintoutController = new DinnerPrintoutController(dinnerPrintoutView, model, this);

    
    // This is the various function that is the generalStateController when we switch between views
    this.goToDishDetail = function(dishId){
        selectDishElement.hide();
        dishDetailsElement.show();
        dishDetailsView.updateDishDetails(dishId);

    }

    this.goToSelectDish = function(viewElement){

        viewElement.hide();
        selectDishElement.show();
        dinnerMenuElement.show();
    }

    this.goToFullRecipe = function(){
        dinnerOverviewElement.hide();
        dinnerPrintoutElement.show();
    }

    this.goToDinnerOverview = function(){
        dinnerMenuElement.hide();
        dishDetailsElement.hide();
        selectDishElement.hide();
        dinnerOverviewElement.show();
    }


});