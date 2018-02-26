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
        var lastSearchDetails = selectDishView.getLastSearchDetails();

        // if offset is 0 we want to display 1 to 10
        var from = lastSearchDetails.offset + 1;
        var to = lastSearchDetails.offset +12;
        var total = lastSearchDetails.totalResults;

        $(this).find('#pagFrom').text(from);
        $(this).find('#pagTo').text(to);
        $(this).find('#totalResult').text(total);
        $(this).show();

    });

    // nextbutton: To adjust the offset
    selectDishView.getContainer().on('click', '#nextButton', function() {

        var lastSearchDetails= selectDishView.getLastSearchDetails();

        // checks if paginations (offset) dont get over the limit of totalresults
        if ((lastSearchDetails.offset + 12) <= lastSearchDetails.totalResults){
            selectDishView.getContainer().find('#paginationDiv').hide();
            selectDishView.updateListOfDishes(lastSearchDetails.type,lastSearchDetails.filter,lastSearchDetails.offset + 12);
        }

    });

    // previous button, to adjust the offset
    selectDishView.getContainer().on('click', '#prevButton', function() {


        var lastSearchDetails= selectDishView.getLastSearchDetails();

        // checks if paginations (offset) dont get get under 0
        if ((lastSearchDetails.offset - 12) >= 0 ){
            selectDishView.getContainer().find('#paginationDiv').hide();
            selectDishView.updateListOfDishes(lastSearchDetails.type,lastSearchDetails.filter,lastSearchDetails.offset - 12);
        }

    });








};
