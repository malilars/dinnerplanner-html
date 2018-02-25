var MenuViewController = function(view, model, app) {

    "use strict";

    // This will handle the change of numberofguest
    view.getSelectBox().change(function(){

        var numberOfGuests = $(this).val();

        model.setNumberOfGuests(numberOfGuests);
    });
    
  
    view.getConfirmDinnerButton().click(function(){
        //confirm dinner button is taking us to dinner overview
        app.goToDinnerOverview();

    })


    // if we want to remove a dish, we click on the name of the dish
    view.getContainer().on('click', '.dishOnMenu', function() {
        var dishId = $(this).attr('id');
        model.removeDishFromMenu(dishId);
    });


};