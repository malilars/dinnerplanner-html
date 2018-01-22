var DishDetailsView = function (container, model) {

    var selectBox = container.find("#numberOfGuests");

    selectBox.val(model.getNumberOfGuests());

    //when we change the select box
    selectBox.change(function() {
        //we must update the model
        model.setNumberOfGuests(
            selectBox.val()
        );
    });
};
 
