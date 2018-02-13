var SelectDishController = function(selectDishView, model,app) {

    "use strict";

    // when user press the searchbutton we load the result
    selectDishView.getSearchDinnerButton().click(function(){
        
        var dishType = selectDishView.getContainer().find('#dish-type').val();
        var textFilter = selectDishView.getContainer().find('#textInputField').val();
        //search for the dishes with the dishtype
        var dishes = model.getAllDishes(dishType,textFilter);
        //update the view
        selectDishView.updateListOfDishes(dishes);
    });

    // when user select the dish and we want to display the dishDetails
    selectDishView.getContainer().on('click', '.thumbnail', function() {
        var dishId = $(this).attr('data-dish-id')
        app.goToDishDetail(dishId);
    });

};
