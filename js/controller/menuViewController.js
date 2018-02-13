var MenuViewController = function(view, model, app) {

    "use strict";

    // This will handle the change of numberofguest- select - form
    view.getSelectBox().change(function(){
      //  alert("Körs det här?");
        var numberOfGuests = $(this).find(":selected").text();
        model.setNumberOfGuests(numberOfGuests);
    });
    
  
    view.getConfirmDinnerButton().click(function(){
        //confirm dinner button is taking us to dinner overview
        app.goToDinnerOverview();

    })

};