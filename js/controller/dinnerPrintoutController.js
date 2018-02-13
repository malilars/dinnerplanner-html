var DinnerPrintoutController = function (dinnerPrintoutView, model,app){
     
    dinnerPrintoutView.getContainer().on('click', '#go-back-and-edit-dinner-button', function() {
        
        app.goToSelectDish(dinnerPrintoutView.getContainer());
    
    });

};