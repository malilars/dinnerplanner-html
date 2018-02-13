var DinnerOverviewView = function(container, model) {

    "use strict";

    model.addObserver(this);
    
    function updateDinnerOverview() {
        var dishesOverview = container.find("#dishes-overview")
        dishesOverview.empty();

        var numberOfGuest = model.getNumberOfGuests();

        var numberOfGuestHeader = container.find("#numberOfGuestsHeader");
        numberOfGuestHeader.text(numberOfGuest);


        var selectedDishes = model.getFullMenu();

        var selectedDishesDivCol = $("<div/>").attr("class", "col-md-8");

        var selectedDishesDivRow = $("<div/>").attr("class", "row");

        selectedDishes.forEach(function(dish) {

            var totDishPrice = model.getTotalDishPrice(dish) * model.getNumberOfGuests();

            var dishDiv = $("<div/>")
                .attr("class", "col-md-3")
                .append(
                    $("<figure/>")
                    .attr("class", "figure")
                    .append($("<img/>")
                        .attr("class", "img img-responsive")
                        .attr('data-dish-id', dish.image))
                        .append(
                            //Create the image
                            $("<img/>")
                                .addClass('img')
                                .addClass('img-responsive')
                                .attr('src', 'images/' + dish.image)
                        )
                    .append(
                        $("<figcaption/>")
                        .attr("class", "figure-caption")
                        .text(dish.name)))
                .append(
                    $("<p/>").text(totDishPrice + " SEK"));

            selectedDishesDivRow.append(dishDiv);
        });

        selectedDishesDivRow.append(
            $("<div/>")
            .attr("class", "col-md-3")
            .append(
                $("<h3/>").text("Total"))
            .append(
                $("<p/>")
                .text(model.getTotalMenuPrice() + " SEK")));

        selectedDishesDivCol.append(selectedDishesDivRow);      
        dishesOverview.append(selectedDishesDivCol);

    }

    // evoked when notifyObservers in model is called
    this.update = function() {
        updateDinnerOverview();
    }

    this.getContainer = function(){
        return container;
    }

    this.getPrintFullRecipeButton = function(){
        return container.find('#full-recipe-button');
    }

    this.getGoBackEditDinnerButton = function()
    {
        return container.find("#go-back-edit-dinner-button");
    }

};