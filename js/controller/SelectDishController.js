var SelectDishController = function(selectDishView, model,app) {

    "use strict";

    // when user press the searchbutton we load the result
    selectDishView.getSearchDinnerButton().click(function(){

        selectDishView.getContainer().find('#paginationDiv').hide();
        var type = selectDishView.getContainer().find('#dish-type').val();
        var filter = selectDishView.getContainer().find('#textInputField').val();
        selectDishView.updateListOfDishes(type,filter,0);
    });

    // when user select the dish and we want to display the dishDetails
    selectDishView.getContainer().on('click', '.thumbnail', function() {
        var dishId = $(this).attr('data-dish-id');
        app.goToDishDetail(dishId);
    });

    // update paginationDiv, this is trigged from selectDishView.updateListOfDishes()
    selectDishView.getContainer().on('update', '#paginationDiv', function() {
        var pagDetails = selectDishView.getPaginationDetails();

        // if offset is 0 we want to display 1 to 10
        var from = pagDetails.offset + 1;
        var to = pagDetails.offset +12;
        var total = pagDetails.totalResults;

        $(this).find('#pagFrom').text(from);
        $(this).find('#pagTo').text(to);
        $(this).find('#totalResult').text(total);
        $(this).show();

    });

    // nextbutton: To adjust the offset
    selectDishView.getContainer().on('click', '#nextButton', function() {

        var pagDetails= selectDishView.getPaginationDetails();

        // checks if paginations (offset) dont get over the limit of totalresults
        if ((pagDetails.offset + 12) <= pagDetails.totalResults){
            selectDishView.getContainer().find('#paginationDiv').hide();
            selectDishView.updateListOfDishes(pagDetails.type,pagDetails.filter,pagDetails.offset + 12);
        }

    });

    // previous button, to adjust the offset
    selectDishView.getContainer().on('click', '#prevButton', function() {

        console.log("hello");
        var pagDetails= selectDishView.getPaginationDetails();

        // checks if paginations (offset) dont get get under 0
        if ((pagDetails.offset - 12) >= 0 ){
            selectDishView.getContainer().find('#paginationDiv').hide();
            selectDishView.updateListOfDishes(pagDetails.type,pagDetails.filter,pagDetails.offset - 12);
        }

    });








};
