var DishDetailsView = function (container, model) {

    "use strict";
    this.currentDishId = null;
    model.addObserver(this);
    
    this.updateDishDetails = function(dishId) {
    
        //store the "current" dish id so that we can update the view
        this.currentDishId = dishId;
        //get the dish from model
        var dish = model.getDish(this.currentDishId);
        //get the number of guests
        var numberOfGuests = model.getNumberOfGuests();
        //initialize the total dish cost
        var totalDishCost = 0;
    
        //update all html
        var colDivOne = $("<div></div>")
            .addClass('col-md-6')
            .append(
                //update head
                $("<h2/>")
                .text(dish.name))
            .append(
                $("<img/>")
                //update picture
                .attr("src", "images/" + dish.image)
                .attr("class", "img img-responsive"))
            .append(
                $("<p/>")
                //update dercription
                .text(dish.description))
            .append(
                $("<button/>")
                .attr("id", "backToSearchViewButton")
                .attr("class", "btn btn-info")
                .text("Back to search")
            ).append(
                $("<h2/>").text("PREPARATION")
            ).append(
                //update preparation description
                $("<p/>").text(dish.description)
            );
        //uppdate ingredients                                   
        var ingredientTable = $("<table/>").attr("class", "table").append("<tbody>");
        dish.ingredients.forEach(function(ingredient) {
    
            var totQuant = ingredient.quantity * numberOfGuests;
            var totCost = ingredient.price * numberOfGuests;
    
            totalDishCost += totCost;
    
            var tr = $("<tr/>")
                .append(
                    $("<td/>")
                    .text(totQuant + " " + ingredient.unit))
                .append(
                    $("<td/>")
                    .text(ingredient.name))
                .append(
                    $("<td/>")
                    .text("SEK"))
                .append(
                    $("<td/>")
                    .text(totCost));
    
            ingredientTable.append(tr);
        });
        ingredientTable.append("</thead>")
            .append(
                $("<tfoot/>")
                .append($("<tr/>")
                    .append(
                        $("<th/>")
                        .attr("colspan", "2")
                        .append(
                            $("<button/>")
                            .attr("chosenDish", dishId)
                            .attr("id", "addToMenuButton")
                            .attr("class", "btn btn-primary")
                            .text("Add to menu")))
                    .append(
                        $("<th/>")
                        .text("SEK"))
                    .append(
                        $("<th/>")
                        .text(totalDishCost))));
    
    
        var colDivTwo = $("<div/>")
            .attr("class", "col-md-6")
            .append(
                $("<div/>")
                .attr("class", "panel panel-default")
                .append(
                    $("<div/>")
                    .attr("class", "panel-heading")
                    .text("Ingredients for " + numberOfGuests + " people"))
                .append(
                    $("<div/>")
                    .attr("class", "panel-body")
                    .append(ingredientTable)
                )
            );
    
        var mainDiv = $("<div/>")
            .attr("class", "row")
            .append(colDivOne)
            .append(colDivTwo);
    
        container.html(mainDiv);
    }

    this.update = function(model)
    {
        this.updateDishDetails(this.currentDishId);
    };

    this.getContainer = function(){
        return container;
    };
}
