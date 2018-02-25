var DinnerMenuView = function (container, model) {

    "use strict";

    model.addObserver(this);
    function updateTable()
    {
        // find the table
        var tbody = container.find("#fullMenuTable tbody");

        // empty the old data
        tbody.empty();

        var totalMenuPrice = precisionRound(model.getTotalMenuPrice(),0);
        var numberOfGuest = model.getNumberOfGuests();

        // loop over model.getFullMenu() and for each dish add it to the table
        model.getFullMenu().forEach(function(dish) {

            //add a row to the table
            tbody.append(
                $("<tr/>").attr("class","dishOnMenu").attr("id", dish.id)
                    .append(
                        $('<td/>').text(dish.title)
                    ).append(
                        $('<td/>').text(precisionRound(numberOfGuest * model.getTotalDishPrice(dish),0))
                    )
            );
        });
        // update the footer
        var totalPriceContainer = container.find("#currentTotalPrice");
        totalPriceContainer.empty();
        totalPriceContainer.text("SEK " + totalMenuPrice);
    };

    this.getContainer = function(){
        return container;
    }

    // evoked when notifyObservers in model is called
    this.update = function()
    {
       updateTable();
       
       //Update the "confirm dinner" button

        if(model.getFullMenu().length === 0){
             container.find("#confirm-dinner-button").prop('disabled', true);
        }
        else{
            container.find("#confirm-dinner-button").prop('disabled', false);
        }
    };

    this.getConfirmDinnerButton = function(){
        return container.find("#confirm-dinner-button");
    }

    this.getSelectBox = function(){
        return container.find("#numberOfGuests");
    }

    function precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    this.getContainer = function(){
        return container;
    }

};